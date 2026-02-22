import { useEffect, useRef } from 'react'
import { FileNode } from '../types'
import { Code, Save, FileText } from 'lucide-react'
import './CodeEditor.css'

interface CodeEditorProps {
  file: FileNode | null
  onEdit: (content: string) => void
}

function CodeEditor({ file, onEdit }: CodeEditorProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (textareaRef.current) {
      // 调整高度
      textareaRef.current.style.height = 'auto'
      textareaRef.current.style.height = textareaRef.current.scrollHeight + 'px'
    }
  }, [file?.content])

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onEdit(e.target.value)
    
    // 自动调整高度
    e.target.style.height = 'auto'
    e.target.style.height = e.target.scrollHeight + 'px'
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault()
      const start = e.currentTarget.selectionStart
      const end = e.currentTarget.selectionEnd
      const value = e.currentTarget.value
      
      // 插入两个空格
      const newValue = value.substring(0, start) + '  ' + value.substring(end)
      onEdit(newValue)
      
      // 设置光标位置
      setTimeout(() => {
        if (e.currentTarget) {
          e.currentTarget.selectionStart = e.currentTarget.selectionEnd = start + 2
        }
      }, 0)
    } else if (e.key === 'Enter' && !e.shiftKey) {
      // 自动缩进
      const textarea = e.currentTarget
      const lines = textarea.value.split('\n')
      const currentLineIndex = textarea.value.substring(0, textarea.selectionStart).split('\n').length - 1
      const currentLine = lines[currentLineIndex]
      const indent = currentLine.match(/^\s*/)?.[0] || ''
      
      // 如果当前行以 { 结尾，增加缩进
      const needsExtraIndent = currentLine.trim().endsWith('{')
      const newIndent = needsExtraIndent ? indent + '  ' : indent
      
      setTimeout(() => {
        const start = textarea.selectionStart
        const value = textarea.value
        const newValue = value.substring(0, start) + '\n' + newIndent + value.substring(start)
        onEdit(newValue)
        
        setTimeout(() => {
          if (textarea) {
            textarea.selectionStart = textarea.selectionEnd = start + newIndent.length + 1
          }
        }, 0)
      }, 0)
    }
  }

  const getLanguage = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    switch (ext) {
      case 'js': return 'JavaScript'
      case 'jsx': return 'React JSX'
      case 'ts': return 'TypeScript'
      case 'tsx': return 'React TSX'
      case 'md': return 'Markdown'
      case 'json': return 'JSON'
      case 'css': return 'CSS'
      case 'html': return 'HTML'
      case 'py': return 'Python'
      default: return 'Plain Text'
    }
  }

  const getLineCount = (content: string) => {
    return content.split('\n').length
  }

  const getCharCount = (content: string) => {
    return content.length
  }

  if (!file) {
    return (
      <div className="code-editor">
        <div className="editor-header">
          <Code size={16} />
          <span>Code Editor</span>
        </div>
        <div className="empty-editor">
          <FileText size={48} className="empty-icon" />
          <h3>No file selected</h3>
          <p>Select a file from the file explorer or create one using the terminal.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="code-editor">
      <div className="editor-header">
        <div className="editor-title">
          <Code size={16} />
          <span className="file-name">{file.name}</span>
          <span className="file-language">{getLanguage(file.name)}</span>
        </div>
        <div className="editor-actions">
          <button className="action-btn save-btn" title="Save (Ctrl+S)">
            <Save size={14} />
          </button>
        </div>
      </div>
      
      <div className="editor-content">
        <div className="line-numbers">
          {(file.content || '').split('\n').map((_line, index) => (
            <div key={index} className="line-number">
              {index + 1}
            </div>
          ))}
        </div>
        
        <textarea
          ref={textareaRef}
          value={file.content || ''}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className="code-textarea"
          spellCheck={false}
          placeholder="Start coding..."
        />
      </div>
      
      <div className="editor-footer">
        <div className="editor-stats">
          <span>Lines: {getLineCount(file.content || '')}</span>
          <span>Characters: {getCharCount(file.content || '')}</span>
        </div>
        <div className="editor-info">
          <span className="encoding">UTF-8</span>
          <span className="eol">LF</span>
        </div>
      </div>
    </div>
  )
}

export default CodeEditor