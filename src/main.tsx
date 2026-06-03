import { StrictMode, Component, ErrorInfo, ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{
          padding: '30px',
          fontFamily: 'system-ui, -apple-system, sans-serif',
          color: '#1e293b',
          backgroundColor: '#f8fafc',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            maxWidth: '600px',
            backgroundColor: '#ffffff',
            padding: '40px',
            borderRadius: '24px',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            border: '1px solid #e2e8f0'
          }}>
            <span style={{ fontSize: '40px' }}>⚠️</span>
            <h2 style={{ fontSize: '24px', fontWeight: '800', marginTop: '20px', marginBottom: '10px', color: '#0f172a' }}>
              Application Render Crash
            </h2>
            <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '20px', lineHeight: '1.6' }}>
              A runtime exception occurred in the browser. You can diagnose the problem below:
            </p>
            <pre style={{
              whiteSpace: 'pre-wrap',
              backgroundColor: '#f1f5f9',
              padding: '20px',
              borderRadius: '12px',
              border: '1px solid #cbd5e1',
              fontFamily: 'monospace',
              fontSize: '12px',
              color: '#334155',
              maxHeight: '250px',
              overflowY: 'auto',
              textAlign: 'left'
            }}>
              {this.state.error?.toString()}
              {"\n\nStack:\n"}
              {this.state.error?.stack}
            </pre>
            <p style={{ fontSize: '13px', color: '#475569', marginTop: '20px' }}>
              Please verify your deployment build files, environment variables, or check the browser console.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </StrictMode>,
);
