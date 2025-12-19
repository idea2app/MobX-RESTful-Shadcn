"use client";

import { observer } from "mobx-react";
import { DataObject } from "mobx-restful";
import { isEmpty } from "web-utility";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { RestForm, RestFormProps } from "../rest-form/rest-form";

export const RestFormModal = observer(
  <T extends DataObject>({
    fields,
    store,
    translator,
    ...props
  }: RestFormProps<T>) => {
    const { indexKey, currentOne } = store;

    const editing = !isEmpty(currentOne),
      ID = currentOne[indexKey];

    return (
      <Dialog open={editing} onOpenChange={() => store.clearCurrent()}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{ID}</DialogTitle>
          </DialogHeader>

          <RestForm
            id={ID}
            {...{ fields, store, translator, ...props }}
          />
        </DialogContent>
      </Dialog>
    );
  }
);

RestFormModal.displayName = "RestFormModal";
