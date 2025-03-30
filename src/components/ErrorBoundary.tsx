import React from 'react';

interface Props {
  children: React.ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 bg-red-900/20 rounded-lg">
          <h2 className="text-xl font-bold text-red-400">Something went wrong</h2>
          <p className="mt-2 text-red-300">{this.state.error?.message}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-900/50 text-red-300 rounded-lg hover:bg-red-900/70"
          >
            Reload Page
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}