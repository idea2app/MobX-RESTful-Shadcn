"use client";

import { observable } from "mobx";
import { observer } from "mobx-react";
import { ButtonHTMLAttributes, Component, MouseEvent } from "react";

import { cn } from "@/lib/utils";

export interface CommandLineProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  speed?: number;
}

@observer
export class CommandLine extends Component<CommandLineProps> {
  static readonly displayName = "CommandLine";

  @observable
  accessor active = false;

  @observable
  accessor shownIndex = 0;

  #timer: ReturnType<typeof setInterval> | undefined;

  componentDidMount() {
    this.boot();
  }

  componentDidUpdate(previousProps: CommandLineProps) {
    const { text, speed } = this.props;

    if (text !== previousProps.text || speed !== previousProps.speed) {
      this.shownIndex = 0;
      this.boot();
    }
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  protected boot() {
    this.clearTimer();

    const { text, speed = 100 } = this.props;

    if (!text) return;

    this.#timer = setInterval(() => {
      this.shownIndex++;

      if (this.shownIndex >= text.length) this.clearTimer();
    }, speed);
  }

  protected clearTimer() {
    if (this.#timer === undefined) return;

    clearInterval(this.#timer);
    this.#timer = undefined;
  }

  autoCopy = async () => {
    const { text } = this.props;

    if (!text) return;

    try {
      if (navigator.clipboard?.writeText)
        return await navigator.clipboard.writeText(text);
    } catch {}

    const textArea = document.createElement("textarea");
    textArea.value = text;
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";

    document.body.append(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
  };

  render() {
    const {
      text,
      speed: _speed,
      className,
      onClick,
      onFocus,
      onBlur,
      ...props
    } = this.props;
    const { active, shownIndex } = this;

    return (
      <button
        className={cn(
          "inline-flex max-w-full items-center gap-2 rounded-md border px-3 py-2 font-mono text-sm",
          className,
        )}
        type="button"
        tabIndex={0}
        onClick={(event: MouseEvent<HTMLButtonElement>) => {
          void this.autoCopy();
          onClick?.(event);
        }}
        onFocus={(event) => {
          this.active = true;
          onFocus?.(event);
        }}
        onBlur={(event) => {
          this.active = false;
          onBlur?.(event);
        }}
        {...props}
      >
        <span className="select-none text-muted-foreground">$</span>
        <kbd className="max-w-full overflow-x-auto whitespace-nowrap bg-transparent">
          {text.slice(0, shownIndex)}
        </kbd>
        <small
          className={cn(
            "rounded bg-primary px-1.5 py-0.5 text-[10px] font-semibold text-primary-foreground transition-opacity",
            active ? "opacity-100" : "opacity-0",
          )}
        >
          Copied!
        </small>
      </button>
    );
  }
}
