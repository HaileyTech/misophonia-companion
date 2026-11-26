import { useEffect, useRef, useState } from 'react'
import {
  AudioLines,
  AudioWaveform,
  Waves,
  Volume2,
  VolumeOff,
  Play,
  Pause,
  Square,
  Upload,
  ChevronDown,
} from 'lucide-react'

import { createNoiseBuffer } from '../../utils/noiseGenerator'

const sounds = [
  {
    id: 'brown',
    title: 'Brown',
    description: 'Deep sound',
    icon: AudioLines,
  },
  {
    id: 'white',
    title: 'White',
    description: 'Even sound',
    icon: Waves,
  },
  {
    id: 'pink',
    title: 'Pink',
    description: 'Balanced sound',
    icon: AudioWaveform,
  },
]

const durations = [5, 10, 15, 30, 60]

const MAX_GAIN = 0.25
const MAX_DURATION_MINUTES = 24 * 60
const FADE_TIME = 0.15

function formatTime(seconds, showHours = false) {
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds % 3600) / 60)
  const remainder = seconds % 60

  if (hours > 0 || showHours) {
    return `${hours}:${String(minutes).padStart(2, '0')}:${String(remainder).padStart(2, '0')}`
  }

  return `${minutes}:${String(remainder).padStart(2, '0')}`
}

function formatDuration(totalMinutes) {
  const hours = Math.floor(totalMinutes / 60)
  const minutes = totalMinutes % 60

  if (hours === 0) {
    return `${minutes}-min session`
  }

  if (minutes === 0) {
    return `${hours}-hour session`
  }

  return `${hours} hr ${minutes} min session`
}

function disposeSession(session) {
  if (!session) return

  if (session.voice) {
    session.voice.source.onended = null

    try {
      session.voice.source.stop()
    } catch {
      // Source may already have stopped.
    }

    session.voice.source.disconnect()
    session.voice.gain.disconnect()
  }

  session.masterGain?.disconnect()

  if (session.context.state !== 'closed') {
    session.context.close().catch(() => {})
  }
}

function NoisePlayer() {
  // Sound and duration selection
  const [selectedSound, setSelectedSound] = useState(null)
  const [duration, setDuration] = useState('')
  const [customHours, setCustomHours] = useState('0')
  const [customMinutes, setCustomMinutes] = useState('30')

  // Volume
  const [volume, setVolume] = useState(15)
  const lastVolumeRef = useRef(15)

  // Playback
  const [status, setStatus] = useState('idle')
  const [elapsed, setElapsed] = useState(0)
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  const sessionRef = useRef(null)

  const isActive = status !== 'idle'
  const isMuted = volume === 0

  // Validate custom duration
  const hours = Number(customHours)
  const minutes = Number(customMinutes)

  const customTotalMinutes = hours * 60 + minutes

  const isCustomValid =
    customHours !== '' &&
    customMinutes !== '' &&
    Number.isInteger(hours) &&
    Number.isInteger(minutes) &&
    hours >= 0 &&
    minutes >= 0 &&
    minutes < 60 &&
    customTotalMinutes > 0 &&
    customTotalMinutes <= MAX_DURATION_MINUTES

  // null represents continuous playback
  const totalMinutes =
    duration === ''
      ? null
      : duration === 'custom'
        ? isCustomValid
          ? customTotalMinutes
          : null
        : Number(duration)

  const totalSeconds =
    totalMinutes === null
      ? null
      : totalMinutes * 60

  const isTimed = totalSeconds !== null

  const remaining = isTimed
    ? Math.max(0, totalSeconds - elapsed)
    : null

  const progress = isTimed
    ? Math.min(100, (elapsed / totalSeconds) * 100)
    : 0

  const canPlay =
    selectedSound !== null &&
    (duration !== 'custom' || isCustomValid) &&
    !busy

  const statusLabels = {
    idle: 'Not playing',
    playing: 'Playing',
    paused: 'Paused',
  }

  // Clean up audio when navigating away.
  useEffect(() => {
    return () => {
      const session = sessionRef.current
      sessionRef.current = null
      disposeSession(session)
    }
  }, [])

  // Update the timer during timed playback.
  useEffect(() => {
    if (status !== 'playing' || !isTimed) return

    function updateTimer() {
      const session = sessionRef.current

      if (!session) return

      const seconds = Math.floor(
        session.context.currentTime - session.startTime
      )

      setElapsed(
        Math.min(
          session.totalSeconds,
          Math.max(0, seconds)
        )
      )
    }

    updateTimer()

    const interval = window.setInterval(updateTimer, 200)

    return () => window.clearInterval(interval)
  }, [status, isTimed])

  // Stop playback and return to the idle state.
  function finishSession(feedback = '') {
    const session = sessionRef.current

    sessionRef.current = null
    disposeSession(session)

    setStatus('idle')
    setElapsed(0)
    setBusy(false)
    setMessage(feedback)
  }

  // Create a source without resetting the session clock.
  function createVoice(session, soundType) {
    const { context, masterGain } = session
    const now = context.currentTime

    const buffer = createNoiseBuffer(
      context,
      soundType
    )

    const source = context.createBufferSource()
    const gain = context.createGain()

    source.buffer = buffer
    source.loop = true

    gain.gain.value = 0

    source.connect(gain)
    gain.connect(masterGain)

    const voice = { source, gain }

    // Fade in the new sound.
    gain.gain.setValueAtTime(0, now)
    gain.gain.linearRampToValueAtTime(
      1,
      now + FADE_TIME
    )

    source.onended = () => {
      source.disconnect()
      gain.disconnect()

      if (
        sessionRef.current === session &&
        session.voice === voice
      ) {
        finishSession(
          'Your sound session is complete.'
        )
      }
    }

    source.start(now)

    // Timed sessions retain their original ending time.
    if (session.endTime !== null) {
      source.stop(session.endTime)
    }

    return voice
  }

  // Start continuous or timed playback.
  async function startSession() {
    if (!canPlay || sessionRef.current) return

    setBusy(true)
    setMessage('')

    let session

    try {
      const AudioContextClass =
        window.AudioContext || window.webkitAudioContext

      if (!AudioContextClass) {
        throw new Error('Web Audio is not supported.')
      }

      const context = new AudioContextClass()

      session = {
        context,
        masterGain: null,
        voice: null,
        startTime: 0,
        endTime: null,
        totalSeconds,
      }

      sessionRef.current = session

      await context.resume()

      // Playback may have been canceled while loading.
      if (sessionRef.current !== session) return

      const masterGain = context.createGain()

      masterGain.gain.value =
        (volume / 100) * MAX_GAIN

      masterGain.connect(context.destination)

      session.masterGain = masterGain
      session.startTime = context.currentTime

      if (totalSeconds !== null) {
        session.endTime =
          session.startTime + totalSeconds
      }

      session.voice = createVoice(
        session,
        selectedSound
      )

      setElapsed(0)
      setStatus('playing')
      setBusy(false)
    } catch (error) {
      console.error('Unable to start sound:', error)

      if (!session || sessionRef.current === session) {
        finishSession(
          'Unable to play sound. Please try again.'
        )
      }
    }
  }

  // Change sounds during playback.
  function selectSound(soundType) {
    if (busy || selectedSound === soundType) return

    setSelectedSound(soundType)
    setMessage('')

    const session = sessionRef.current

    // Nothing is playing yet.
    if (!session) return

    const now = session.context.currentTime

    if (
      session.endTime !== null &&
      now >= session.endTime
    ) {
      finishSession('Your sound session is complete.')
      return
    }

    try {
      const previousVoice = session.voice

      // Create a new sound using the same audio context.
      session.voice = createVoice(session, soundType)

      // Fade out the previous sound.
      if (previousVoice) {
        const previousGain = previousVoice.gain.gain

        previousGain.cancelScheduledValues(now)

        previousGain.setTargetAtTime(
          0,
          now,
          FADE_TIME / 5
        )

        const stopTime = session.endTime === null
          ? now + FADE_TIME
          : Math.min(
              now + FADE_TIME,
              session.endTime
            )

        previousVoice.source.stop(stopTime)
      }
    } catch (error) {
      console.error('Unable to change sound:', error)

      finishSession(
        'Unable to change sounds. Please try again.'
      )
    }
  }

  // Pause a timed session.
  async function pauseSession() {
    const session = sessionRef.current

    if (!session || busy || status !== 'playing') return

    setBusy(true)

    try {
      await session.context.suspend()

      if (sessionRef.current !== session) return

      setElapsed(
        Math.min(
          session.totalSeconds,
          Math.max(
            0,
            Math.floor(
              session.context.currentTime -
              session.startTime
            )
          )
        )
      )

      setStatus('paused')
      setBusy(false)
    } catch {
      if (sessionRef.current === session) {
        finishSession(
          'The sound session was interrupted.'
        )
      }
    }
  }

  // Resume the same timed session.
  async function resumeSession() {
    const session = sessionRef.current

    if (!session || busy || status !== 'paused') return

    setBusy(true)

    try {
      await session.context.resume()

      if (sessionRef.current !== session) return

      setStatus('playing')
      setBusy(false)
    } catch {
      if (sessionRef.current === session) {
        finishSession(
          'Unable to resume the sound session.'
        )
      }
    }
  }

  // Update the master volume for every sound.
  function updateVolume(nextVolume) {
    setVolume(nextVolume)

    if (nextVolume > 0) {
      lastVolumeRef.current = nextVolume
    }

    const session = sessionRef.current

    if (session?.masterGain) {
      const gain = session.masterGain.gain
      const now = session.context.currentTime

      gain.cancelScheduledValues(now)

      gain.setTargetAtTime(
        (nextVolume / 100) * MAX_GAIN,
        now,
        0.02
      )
    }
  }

  function changeVolume(event) {
    updateVolume(Number(event.target.value))
  }

  // Mute or restore the previous volume.
  function toggleMute() {
    if (isMuted) {
      updateVolume(lastVolumeRef.current || 15)
    } else {
      updateVolume(0)
    }
  }

  return (
    <section
      aria-labelledby="sound-player-heading"
      className="rounded-2xl border border-secondary/50 bg-white p-5 sm:p-8"
    >
      {/* Player heading and status */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2
            id="sound-player-heading"
            className="text-xl font-bold sm:text-2xl"
          >
            Background Sound Player
          </h2>

          <p className="mt-1 text-sm sm:text-base">
            {isActive
              ? 'Choose a background sound'
              : 'Choose a background sound to get started'}
          </p>
        </div>

        <span
          aria-live="polite"
          className={`rounded-full px-4 py-1.5 text-sm ${
            status === 'playing'
              ? 'bg-soft-sage text-sage'
              : 'bg-warm-sand text-charcoal'
          }`}
        >
          {statusLabels[status]}
        </span>
      </div>

      {/* Future upload feature */}
      <div className="mb-3 flex justify-end">
        <button
          type="button"
          disabled
          className="inline-flex items-center gap-2 text-xs text-secondary"
        >
          Upload your own sound (coming later)
          <Upload size={16} aria-hidden="true" />
        </button>
      </div>

      {/* Sound selection */}
      <div
        role="group"
        aria-label="Background sound type"
        className="grid grid-cols-1 gap-4 sm:grid-cols-3"
      >
        {sounds.map(({ id, title, description, icon: Icon }) => (
          <button
            key={id}
            type="button"
            disabled={busy}
            aria-pressed={selectedSound === id}
            onClick={() => selectSound(id)}
            className={`flex flex-col items-center justify-center gap-2 rounded-xl border border-secondary/50 p-5 transition-colors ${
              selectedSound === id
                ? 'bg-soft-sage'
                : 'bg-white enabled:hover:bg-pale-sage'
            }`}
          >
            <Icon
              size={32}
              strokeWidth={1.7}
              aria-hidden="true"
            />

            <span className="font-heading text-lg font-bold">
              {title}
            </span>

            <span className="text-sm">
              {description}
            </span>
          </button>
        ))}
      </div>

      {/* Timed session progress */}
      {isActive && isTimed && (
        <div className="mt-7">
          <p className="mb-2 font-semibold">
            {formatDuration(totalMinutes)}
          </p>

          <div
            role="progressbar"
            aria-label="Sound session progress"
            aria-valuemin={0}
            aria-valuemax={totalSeconds}
            aria-valuenow={elapsed}
            className="h-2 overflow-hidden rounded-full bg-gray-200"
          >
            <div
              className="h-full rounded-full bg-sage"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="mt-2 flex justify-between text-sm tabular-nums">
            <span>
              {formatTime(elapsed, totalSeconds >= 3600)} elapsed
            </span>

            <span>
              {formatTime(remaining, totalSeconds >= 3600)} remaining
            </span>
          </div>
        </div>
      )}

      {/* Volume and mute controls */}
      <div className="mt-6">
        <label
          htmlFor="sound-volume"
          className="mb-2 block text-sm font-medium"
        >
          Volume
        </label>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleMute}
            disabled={busy}
            aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            title={isMuted ? 'Unmute sound' : 'Mute sound'}
            className="shrink-0 rounded-lg p-1 transition-colors hover:bg-pale-sage hover:text-sage"
          >
            {isMuted ? (
              <VolumeOff size={23} aria-hidden="true" />
            ) : (
              <Volume2 size={23} aria-hidden="true" />
            )}
          </button>

          <input
            id="sound-volume"
            type="range"
            min="0"
            max="100"
            step="1"
            value={volume}
            disabled={busy}
            onChange={changeVolume}
            aria-valuetext={`${volume} percent`}
            className="w-full cursor-pointer accent-sage"
          />

          <span className="w-12 text-right text-sm tabular-nums">
            {volume}%
          </span>
        </div>
      </div>

      {/* Custom duration inputs */}
      {!isActive && duration === 'custom' && (
        <div className="mt-6 rounded-xl bg-background p-4 sm:p-5">
          <h3 className="mb-3 font-semibold">
            Custom duration
          </h3>

          <div className="grid max-w-md grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="custom-hours"
                className="mb-2 block text-sm"
              >
                Hours
              </label>

              <input
                id="custom-hours"
                type="number"
                min="0"
                max="24"
                step="1"
                value={customHours}
                disabled={busy}
                onChange={(event) =>
                  setCustomHours(event.target.value)
                }
                className="w-full rounded-lg border border-secondary/40 bg-white px-4 py-3"
              />
            </div>

            <div>
              <label
                htmlFor="custom-minutes"
                className="mb-2 block text-sm"
              >
                Minutes
              </label>

              <input
                id="custom-minutes"
                type="number"
                min="0"
                max="59"
                step="1"
                value={customMinutes}
                disabled={busy}
                onChange={(event) =>
                  setCustomMinutes(event.target.value)
                }
                className="w-full rounded-lg border border-secondary/40 bg-white px-4 py-3"
              />
            </div>
          </div>

          <p
            aria-live="polite"
            className={`mt-3 text-sm ${
              isCustomValid
                ? 'text-sage'
                : 'text-red-700'
            }`}
          >
            {isCustomValid
              ? `Selected duration: ${hours} hr ${minutes} min`
              : 'Enter a valid duration between 1 minute and 24 hours.'}
          </p>
        </div>
      )}

      {/* Idle and continuous playback controls */}
      {!isActive || !isTimed ? (
        <div className="mt-7 flex flex-wrap items-center gap-4">

          {/* Duration dropdown */}
          <div className="relative">
            <select
              aria-label="Session duration (optional)"
              value={duration}
              disabled={isActive || busy}
              onChange={(event) => {
                setDuration(event.target.value)
                setMessage('')
              }}
              className="min-w-36 appearance-none rounded-xl border border-secondary/50 bg-white py-3 pl-4 pr-11 text-sm disabled:cursor-not-allowed disabled:opacity-60"
            >
              <option value="">Duration</option>

              {durations.map((minutes) => (
                <option key={minutes} value={minutes}>
                  {minutes === 60
                    ? '1 hour'
                    : `${minutes} minutes`}
                </option>
              ))}

              <option value="custom">
                Custom duration…
              </option>
            </select>

            <ChevronDown
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2"
            />
          </div>

          {/* Play or Stop */}
          <button
            type="button"
            disabled={isActive ? false : !canPlay}
            onClick={
              isActive
                ? () => finishSession()
                : startSession
            }
            className="inline-flex min-w-40 flex-1 items-center justify-center gap-3 rounded-full bg-sage px-6 py-3 font-semibold text-white transition-colors enabled:hover:bg-sage-dark disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isActive ? (
              <>
                <Square
                  size={16}
                  fill="currentColor"
                  aria-hidden="true"
                />
                Stop
              </>
            ) : (
              <>
                <Play
                  size={19}
                  fill="currentColor"
                  aria-hidden="true"
                />
                {busy ? 'Starting...' : 'Play'}
              </>
            )}
          </button>
        </div>
      ) : (
        /* Timed session controls */
        <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <button
            type="button"
            disabled={busy}
            onClick={
              status === 'playing'
                ? pauseSession
                : resumeSession
            }
            className="inline-flex items-center justify-center gap-3 rounded-full bg-sage px-6 py-3 font-semibold text-white transition-colors enabled:hover:bg-sage-dark disabled:opacity-50"
          >
            {status === 'playing' ? (
              <>
                <Pause
                  size={19}
                  fill="currentColor"
                  aria-hidden="true"
                />
                Pause
              </>
            ) : (
              <>
                <Play
                  size={19}
                  fill="currentColor"
                  aria-hidden="true"
                />
                Resume
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => finishSession()}
            className="inline-flex items-center justify-center gap-3 rounded-full bg-soft-sage px-6 py-3 font-semibold transition-colors hover:bg-soft-sage-dark"
          >
            <Square
              size={16}
              fill="currentColor"
              aria-hidden="true"
            />
            End Session
          </button>
        </div>
      )}

      {/* Clarify that duration is optional */}
      {!isActive && duration === '' && (
        <p className="mt-3 text-xs text-secondary">
          Leave the duration unselected to play continuously
          until you press Stop.
        </p>
      )}

      {message && (
        <p
          role="status"
          className="mt-4 text-sm text-sage"
        >
          {message}
        </p>
      )}
    </section>
  )
}

export default NoisePlayer
