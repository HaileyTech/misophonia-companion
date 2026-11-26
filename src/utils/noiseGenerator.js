export function createNoiseBuffer(audioContext, type) {
  const sampleRate = audioContext.sampleRate
  const duration = 8

  const length = sampleRate * duration
  const overlap = Math.floor(sampleRate * 0.05)

  const samples = new Float32Array(length + overlap)

  let lastOut = 0

  // Variables used for pink noise
  let b0 = 0
  let b1 = 0
  let b2 = 0
  let b3 = 0
  let b4 = 0
  let b5 = 0
  let b6 = 0

  for (let i = 0; i < samples.length; i++) {
    const white = Math.random() * 2 - 1

    switch (type) {
      case 'brown':
        lastOut = (lastOut + 0.02 * white) / 1.02
        samples[i] = lastOut
        break

      case 'pink':
        b0 = 0.99886 * b0 + white * 0.0555179
        b1 = 0.99332 * b1 + white * 0.0750759
        b2 = 0.96900 * b2 + white * 0.1538520
        b3 = 0.86650 * b3 + white * 0.3104856
        b4 = 0.55000 * b4 + white * 0.5329522
        b5 = -0.7616 * b5 - white * 0.0168980

        samples[i] =
          b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362

        b6 = white * 0.115926
        break

      case 'white':
      default:
        samples[i] = white
        break
    }
  }

  // Smooth the transition where the buffer loops
  for (let i = 0; i < overlap; i++) {
    const blend = i / overlap

    samples[i] =
      samples[length + i] * (1 - blend) +
      samples[i] * blend
  }

  // Normalize the waveform to avoid digital clipping
  let peak = 0

  for (let i = 0; i < length; i++) {
    peak = Math.max(peak, Math.abs(samples[i]))
  }

  const scale = peak > 0 ? 0.8 / peak : 0

  const buffer = audioContext.createBuffer(
    1,
    length,
    sampleRate
  )

  const output = buffer.getChannelData(0)

  for (let i = 0; i < length; i++) {
    output[i] = samples[i] * scale
  }

  return buffer
}
