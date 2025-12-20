import {
  IFrameTool as FT,
  ImageTool as IT,
  AudioTool as AT,
  VideoTool as VT,
} from "edkit";

import { renderTool } from "../tool";

export class IFrameTool extends FT {
  icon = "Frame";
  render = renderTool;
}

export class ImageTool extends IT {
  icon = "Image";
  render = renderTool;
}

export class AudioTool extends AT {
  icon = "Mic";
  render = renderTool;
}

export class VideoTool extends VT {
  icon = "Video";
  render = renderTool;
}
