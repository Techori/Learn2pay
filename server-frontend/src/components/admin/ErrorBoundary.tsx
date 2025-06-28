import { Component } from 'react';
import type { ReactNode } from 'react';
import NotificationManagement from './NotificationManagement';

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong. Please try again later.</h1>;
    }
    return this.props.children;
  }
}

// In your route or parent component
<ErrorBoundary>
  <NotificationManagement />
</ErrorBoundary>