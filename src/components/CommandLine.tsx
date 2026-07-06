import React, { Component } from 'react';
import { cn } from '@/lib/utils';

export interface CommandLineProps {
  command: string;
  className?: string;
}

interface State {
  copied: boolean;
}

export class CommandLine extends Component<CommandLineProps, State> {
  constructor(props: CommandLineProps) {
    super(props);
    this.state = { copied: false };
  }

  handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(this.props.command);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    } catch {
      // fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = this.props.command;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2000);
    }
  };

  render() {
    const { command, className } = this.props;
    const { copied } = this.state;

    return (
      <div
        className={cn(
          'flex items-center gap-2 rounded-md bg-muted px-4 py-2 text-sm font-mono',
          className
        )}
      >
        <span className="flex-1">{command}</span>
        <button
          onClick={this.handleCopy}
          className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </div>
    );
  }
}

export default CommandLine;
