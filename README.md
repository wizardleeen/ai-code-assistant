# AI Code Assistant

A CLI-style AI coding assistant with terminal interface, similar to Claude Code. Built with React, TypeScript, and Vite.

## Features

✨ **Terminal Interface** - Command-line style interaction
📝 **Code Editor** - Syntax highlighting and smart editing
📁 **File Explorer** - Manage and organize your files
🤖 **AI Assistant** - Get coding help and suggestions
🎨 **Modern UI** - Dark theme with professional styling
📱 **Responsive** - Works on desktop and mobile devices

## Commands

- `help` - Show available commands
- `create <filename>` - Create a new file
- `open <filename>` - Open a file in editor
- `list` - List all files
- `ai <question>` - Ask AI for coding help
- `run <filename>` - Simulate running a file
- `delete <filename>` - Delete a file
- `clear` - Clear terminal

## Getting Started

1. **Installation**
   ```bash
   npm install
   ```

2. **Development**
   ```bash
   npm run dev
   ```

3. **Build**
   ```bash
   npm run build
   ```

## Usage Examples

### Create a new JavaScript file:
```bash
$ create app.js
```

### Ask AI for help:
```bash
$ ai how to create a React component
```

### Open a file in the editor:
```bash
$ open app.js
```

## Tech Stack

- **React** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Lucide React** - Icons
- **CSS3** - Styling with modern features

## Architecture

```
src/
├── components/
│   ├── Terminal.tsx       # Command-line interface
│   ├── FileExplorer.tsx   # File management
│   └── CodeEditor.tsx     # Code editing
├── types.ts            # TypeScript definitions
├── App.tsx             # Main application
└── main.tsx            # Entry point
```

## Features in Detail

### Terminal
- Command history (arrow keys)
- Auto-completion suggestions
- Color-coded output
- Scrollable message history

### Code Editor
- Syntax highlighting
- Line numbers
- Auto-indentation
- Tab support
- File statistics

### File Explorer
- File type icons
- File size and language info
- Preview content
- Click to open files

### AI Assistant
- Context-aware responses
- Code examples
- Best practices suggestions
- Multiple programming languages

## Browser Compatibility

- Chrome/Edge 88+
- Firefox 85+
- Safari 14+

## License

MIT License - feel free to use this project for learning and development!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
