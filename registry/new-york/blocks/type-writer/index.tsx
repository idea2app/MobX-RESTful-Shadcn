"use client";

import { observable } from "mobx";
import { observer } from "mobx-react";
import { ObservedComponent, reaction } from "mobx-react-helper";
import { createRef, HTMLAttributes } from "react";
import { sleep, watchVisible } from "web-utility";

export interface TypeWriterProps extends HTMLAttributes<HTMLSpanElement> {
  children: string;
  intervalSeconds?: number;
}

@observer
export class TypeWriter extends ObservedComponent<TypeWriterProps> {
  static readonly displayName = "TypeWriter";

  @observable
  accessor shownIndex = 0;

  #bootVersion = 0;

  #box = createRef<HTMLSpanElement>();

  componentDidMount() {
    super.componentDidMount();

    if (this.#box.current)
      watchVisible(this.#box.current, this.boot.bind(this));
  }

  componentWillUnmount() {
    super.componentWillUnmount();
    this.#bootVersion++;
  }

  @reaction(
    ({ observedProps }) =>
      observedProps.children + observedProps.intervalSeconds,
  )
  async boot() {
    const taskVersion = ++this.#bootVersion;
    const { children, intervalSeconds = 0.1 } = this.props;

    this.shownIndex = 0;

    if (!children) return;

    for (let index = 1; index <= children.length; index++) {
      await sleep(intervalSeconds);

      if (taskVersion !== this.#bootVersion) return;

      this.shownIndex = index;
    }
  }

  render() {
    const { children, ...props } = this.props;

    return (
      <span ref={this.#box} {...props}>
        {children.slice(0, this.shownIndex)}
      </span>
    );
  }
}
