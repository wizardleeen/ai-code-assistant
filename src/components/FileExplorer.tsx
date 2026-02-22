import { FileNode } from '../types'
import { File, Folder, Code, FileText } from 'lucide-react'
import './FileExplorer.css'

interface FileExplorerProps {
  files: FileNode[]
  onFileSelect: (file: FileNode) => void
}

function FileExplorer({ files, onFileSelect }: FileExplorerProps) {
  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    
    switch (ext) {
      case 'js':
      case 'jsx':
      case 'ts':
      case 'tsx':
        return <Code size={16} className="file-icon code-icon" />
      case 'md':
      case 'txt':
        return <FileText size={16} className="file-icon text-icon" />
      default:
        return <File size={16} className="file-icon default-icon" />
    }
  }

  const formatFileSize = (content?: string) => {
    if (!content) return '0 B'
    const bytes = new Blob([content]).size
    if (bytes < 1024) return `${bytes} B`
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`
  }

  const getLanguage = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase()
    
    switch (ext) {
      case 'js': return 'JavaScript'
      case 'jsx': return 'React JSX'
      case 'ts': return 'TypeScript'
      case 'tsx': return 'React TSX'
      case 'md': return 'Markdown'
      case 'txt': return 'Plain Text'
      case 'json': return 'JSON'
      case 'css': return 'CSS'
      case 'html': return 'HTML'
      case 'py': return 'Python'
      default: return 'Unknown'
    }
  }

  if (files.length === 0) {
    return (
      <div className="file-explorer">
        <div className="file-explorer-header">
          <Folder size={16} />
          <span>File Explorer</span>
        </div>
        <div className="empty-state">
          <Folder size={48} className="empty-icon" />
          <h3>No files</h3>
          <p>Use the terminal to create files with the "create" command.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="file-explorer">
      <div className="file-explorer-header">
        <Folder size={16} />
        <span>File Explorer</span>
        <div className="file-count">{files.length} files</div>
      </div>
      
      <div className="file-list">
        {files.map((file) => (
          <div
            key={file.id}
            className="file-item"
            onClick={() => onFileSelect(file)}
          >
            <div className="file-info">
              <div className="file-main">
                {getFileIcon(file.name)}
                <span className="file-name">{file.name}</span>
              </div>
              <div className="file-meta">
                <span className="file-language">{getLanguage(file.name)}</span>
                <span className="file-size">{formatFileSize(file.content)}</span>
              </div>
            </div>
            
            {file.content && (
              <div className="file-preview">
                <pre className="preview-content">
                  {file.content.split('\n').slice(0, 3).join('\n')}
                  {file.content.split('\n').length > 3 && '...'}
                </pre>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default FileExplorer