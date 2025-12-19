import {
  BoldTool,
  ItalicTool,
  UnderlineTool,
  StrikeThroughTool,
  H1Tool,
  H2Tool,
  H3Tool,
  FontSizeDownTool,
  FontSizeUpTool,
  SubscriptTool,
  SuperscriptTool,
  LinkTool,
} from "./text";
import { ForeColorTool, BackColorTool } from "./color";
import {
  AlignLeftTool,
  AlignCenterTool,
  AlignRightTool,
  AlignFullTool,
  OrderedListTool,
  UnorderedListTool,
  HorizontalRuleTool,
} from "./layout";
import { IFrameTool, ImageTool, AudioTool, VideoTool } from "./media";
import { UndoTool, RedoTool, ResetTool, ClearTool } from "./control";
import { CopyMarkdownTool } from "./extra";

export * from "./text";
export * from "./color";
export * from "./layout";
export * from "./media";
export * from "./control";
export * from "./extra";

export const TextTools = [
  BoldTool,
  ItalicTool,
  UnderlineTool,
  StrikeThroughTool,
  H1Tool,
  H2Tool,
  H3Tool,
  FontSizeDownTool,
  FontSizeUpTool,
  SubscriptTool,
  SuperscriptTool,
  LinkTool,
];

export const ColorTools = [ForeColorTool, BackColorTool];

export const LayoutTools = [
  AlignLeftTool,
  AlignCenterTool,
  AlignRightTool,
  AlignFullTool,
  OrderedListTool,
  UnorderedListTool,
  HorizontalRuleTool,
];

export const MediaTools = [IFrameTool, ImageTool, AudioTool, VideoTool];

export const ControlTools = [UndoTool, RedoTool, ResetTool, ClearTool];

export const ExtraTools = [CopyMarkdownTool];

export const OriginalTools = [
  ...TextTools,
  ...ColorTools,
  ...LayoutTools,
  ...MediaTools,
  ...ControlTools,
];

export const DefaultTools = [
  BoldTool,
  ItalicTool,
  UnderlineTool,
  StrikeThroughTool,
  H1Tool,
  H2Tool,
  H3Tool,
  SubscriptTool,
  SuperscriptTool,
  ForeColorTool,
  BackColorTool,
  AlignLeftTool,
  AlignCenterTool,
  AlignRightTool,
  AlignFullTool,
  OrderedListTool,
  UnorderedListTool,
  HorizontalRuleTool,
  ImageTool,
  UndoTool,
  RedoTool,
  ClearTool,
];
