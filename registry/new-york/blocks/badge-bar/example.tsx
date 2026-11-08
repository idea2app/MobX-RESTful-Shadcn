"use client";

import { action, observable } from "mobx";
import { observer } from "mobx-react";
import { Component } from "react";

import { BadgeBar, BadgeItem } from "./index";

@observer
export class BadgeBarExample extends Component {
  @observable accessor items: BadgeItem[] = [
    { text: "React" },
    { text: "TypeScript" },
    { text: "Next.js", link: "https://nextjs.org" },
    { text: "Tailwind CSS", link: "https://tailwindcss.com" },
    { text: "Shadcn UI" },
    { text: "MobX" },
  ];

  handleCheck = (item: BadgeItem, index: number) =>
    console.log("Clicked:", item, "at index", index);

  handleDelete = action((_item: BadgeItem, index: number) => {
    this.items = this.items.filter((_, i) => i !== index);
  });

  render() {
    const { items } = this;

    return (
      <div className="w-full space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Basic Badge Bar</h3>
          <BadgeBar list={items.slice(0, 3)} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">
            Badge Bar with Click Handler
          </h3>
          <BadgeBar list={items.slice(0, 3)} onCheck={this.handleCheck} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">
            Badge Bar with Delete Handler
          </h3>
          <BadgeBar list={items} onDelete={this.handleDelete} />
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">
            Badge Bar with Links and Delete
          </h3>
          <BadgeBar
            list={items}
            onCheck={this.handleCheck}
            onDelete={this.handleDelete}
          />
        </div>
      </div>
    );
  }
}
