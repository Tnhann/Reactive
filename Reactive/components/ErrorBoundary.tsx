import React, { Component, ErrorInfo, ReactNode } from 'react';
import { StyleSheet, View, TouchableOpacity, ScrollView } from 'react-native';
import { ThemedText } from './ThemedText';
import { IconSymbol } from './ui/IconSymbol';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error, errorInfo: null };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // You can also log the error to an error reporting service
    console.error('Error caught by ErrorBoundary:', error, errorInfo);
    this.setState({ errorInfo });
  }

  resetError = (): void => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <View style={styles.container}>
          <IconSymbol size={60} name="exclamationmark.triangle.fill" color="#FF9500" style={styles.icon} />
          <ThemedText type="title" style={styles.title}>Bir Hata Oluştu</ThemedText>
          <ThemedText style={styles.message}>
            Uygulama beklenmeyen bir hata ile karşılaştı. Lütfen tekrar deneyin.
          </ThemedText>

          {this.state.error && (
            <View style={styles.errorContainer}>
              <ThemedText style={styles.errorTitle}>Hata Detayları:</ThemedText>
              <ScrollView style={styles.errorScroll}>
                <ThemedText style={styles.errorText}>{this.state.error.toString()}</ThemedText>
                {this.state.errorInfo && (
                  <ThemedText style={styles.errorStack}>
                    {this.state.errorInfo.componentStack}
                  </ThemedText>
                )}
              </ScrollView>
            </View>
          )}

          <TouchableOpacity style={styles.button} onPress={this.resetError}>
            <ThemedText style={styles.buttonText}>Tekrar Dene</ThemedText>
          </TouchableOpacity>
        </View>
      );
    }

    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  message: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 24,
    opacity: 0.8,
  },
  errorContainer: {
    width: '100%',
    marginBottom: 24,
    padding: 16,
    backgroundColor: 'rgba(255, 0, 0, 0.05)',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, 0.2)',
  },
  errorTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  errorScroll: {
    maxHeight: 200,
  },
  errorText: {
    fontSize: 14,
    color: '#FF3B30',
    marginBottom: 8,
  },
  errorStack: {
    fontSize: 12,
    opacity: 0.7,
    fontFamily: 'SpaceMono',
  },
  button: {
    backgroundColor: '#0066cc',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ErrorBoundary;
