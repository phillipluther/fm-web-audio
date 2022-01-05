# notes

## web audio :: how it works

- based entirely on nodes and routing one node to another
- lego building blocks for audio, eg.
  - microphone (AudioNode) --> speaker (AudioDestinationNode)
  - MP3 file (AudioNode) --> speak (AudioDestinationNode)
  - MP3 file (AudioNode) --> echo fx (DelayNode) --> speaker (AudioDestinationNode)
  - etc.
