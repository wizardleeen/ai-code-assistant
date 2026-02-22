export interface FileNode {
  id: string
  name: string
  type: 'file' | 'folder'
  content?: string
  children?: FileNode[]
}

export interface Message {
  id: string
  type: 'user' | 'system' | 'ai'
  content: string
  timestamp: Date
}

export interface Command {
  name: string
  description: string
  usage: string
  handler: (args: string[]) => void
}