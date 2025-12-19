"use client";

import { computed, observable } from "mobx";
import { TranslationModel } from "mobx-i18n";
import { observer } from "mobx-react";
import { ObservedComponent } from "mobx-react-helper";
import { DataObject, Filter, IDType } from "mobx-restful";
import { HTMLAttributes, ReactNode } from "react";
import { isEmpty } from "web-utility";
import debounce from "lodash.debounce";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BadgeBar } from "../badge-bar/badge-bar";
import { FilePreview } from "../file-preview/file-preview";
import { Pager } from "../pager/pager";
import { Field, RestForm, RestFormProps } from "../rest-form/rest-form";
import { RestFormModal } from "../rest-form-modal/rest-form-modal";

export interface Column<T extends DataObject>
  extends Omit<Field<T>, "renderLabel"> {
  renderHead?: Field<T>["renderLabel"];
  renderBody?: (data: T) => ReactNode;
  renderFoot?: ReactNode | ((data: keyof T) => ReactNode);
}

type Translator<T extends DataObject> = RestFormProps<T>["translator"] &
  TranslationModel<
    string,
    | "create"
    | "view"
    | "edit"
    | "delete"
    | "total_x_rows"
    | "sure_to_delete_x"
  >;

export interface RestTableProps<
  D extends DataObject,
  F extends Filter<D> = Filter<D>
> extends Omit<HTMLAttributes<HTMLDivElement>, "onSubmit" | "onReset" | "children"> {
  filter?: F;
  filterFields?: Field<F>[];
  editable?: boolean;
  deletable?: boolean;
  columns: Column<D>[];
  translator: Translator<D>;
  size?: "default" | "sm" | "lg";
  onCheck?: (keys: IDType[]) => any;
  striped?: boolean;
  hover?: boolean;
  responsive?: boolean;
  store?: RestFormProps<D>["store"];
  onSubmit?: RestFormProps<D>["onSubmit"];
  onReset?: RestFormProps<D>["onReset"];
}

@observer
export class RestTable<
  D extends DataObject,
  F extends Filter<D> = Filter<D>
> extends ObservedComponent<RestTableProps<D, F>> {
  static readonly displayName = "RestTable";

  componentDidMount() {
    const { store, filter } = this.props;

    if (store) {
      store.clear();
      store.getList(filter);
    }
  }

  @computed
  get fieldSize() {
    const { size } = this.observedProps;

    return !size || size === "default" ? "default" : size;
  }

  @observable
  accessor checkedKeys: IDType[] = [];

  toggleCheck(key: IDType) {
    const { checkedKeys } = this;
    const index = checkedKeys.indexOf(key);

    this.checkedKeys =
      index < 0
        ? [...checkedKeys, key]
        : [...checkedKeys.slice(0, index), ...checkedKeys.slice(index + 1)];

    this.props.onCheck?.(this.checkedKeys);
  }

  toggleCheckAll = () => {
    const { store, onCheck } = this.props;
    if (!store) return;

    const { indexKey, currentPage } = store;

    this.checkedKeys =
      this.checkedKeys.length
        ? []
        : currentPage.map(({ [indexKey]: ID }) => ID);

    onCheck?.(this.checkedKeys);
  };

  @computed
  get checkColumn(): Column<D> {
    const { checkedKeys, toggleCheckAll } = this;
    const { store } = this.observedProps;
    if (!store) return {} as Column<D>;

    const { indexKey, currentPage } = store;

    return {
      renderHead: () => (
        <Checkbox
          checked={
            !!currentPage[0] &&
            currentPage.every(({ [indexKey]: ID }) =>
              checkedKeys.includes(ID)
            )
          }
          onCheckedChange={toggleCheckAll}
          aria-label="Select all"
        />
      ),
      renderBody: ({ [indexKey]: ID }) => (
        <Checkbox
          checked={checkedKeys.includes(ID)}
          onCheckedChange={() => this.toggleCheck(ID)}
          aria-label={`Select row ${ID}`}
        />
      ),
    };
  }

  @computed
  get operateColumn(): Column<D> {
    const { editable, deletable, columns, store, translator } =
      this.observedProps;
    if (!store) return {} as Column<D>;

    const { fieldSize } = this;
    const { t } = translator;
    const readOnly = columns.every(({ readOnly }) => readOnly);
    const disabled = columns.every(({ disabled }) => disabled);

    return {
      renderHead: () => <></>,
      renderBody: (data) => (
        <div className="flex gap-1">
          {!disabled &&
            editable && (
              <Button
                variant={readOnly ? "default" : "outline"}
                size={fieldSize}
                onClick={() => (store.currentOne = data)}
              >
                {readOnly ? t("view") : t("edit")}
              </Button>
            )}
          {deletable && (
            <Button
              variant="destructive"
              size={fieldSize}
              onClick={() => this.deleteList([data[store.indexKey] as IDType])}
            >
              {t("delete")}
            </Button>
          )}
        </div>
      ),
    };
  }

  @computed
  get columns(): Column<D>[] {
    const { editable, deletable, columns, onCheck } = this.observedProps;

    return [
      onCheck && this.checkColumn,
      ...columns.map(
        ({ renderBody, ...column }) =>
          ({
            ...column,
            renderBody: renderBody ?? this.renderCustomBody(column),
          } as Column<D>)
      ),
      (editable || deletable) && this.operateColumn,
    ].filter(Boolean) as Column<D>[];
  }

  @computed
  get hasHeader() {
    return this.columns.some(({ renderHead }) => renderHead);
  }

  @computed
  get hasFooter() {
    return this.columns.some(({ renderFoot }) => renderFoot);
  }

  @computed
  get editing() {
    const { store } = this.observedProps;
    return !isEmpty(store?.currentOne);
  }

  renderCustomBody = ({
    key,
    type,
    multiple,
    options,
    accept,
    rows,
  }: Column<D>): Column<D>["renderBody"] =>
    type === "url"
      ? ({ [key!]: value }) =>
          value && (
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={value as string}
              className="text-primary hover:underline"
            >
              {value as string}
            </a>
          )
      : type === "email"
      ? ({ [key!]: value }) =>
          value && (
            <a
              href={`mailto:${value}`}
              className="text-primary hover:underline"
            >
              {value as string}
            </a>
          )
      : type === "tel"
      ? ({ [key!]: value }) =>
          value && (
            <a href={`tel:${value}`} className="text-primary hover:underline">
              {value as string}
            </a>
          )
      : type === "file"
      ? ({ [key!]: value }) =>
          ((Array.isArray(value) ? value : [value]) as string[]).map(
            (path) =>
              path && <FilePreview key={path} type={accept} path={path} />
          )
      : options || multiple
      ? ({ [key!]: value }) =>
          value && (
            <BadgeBar
              list={(value as string[]).map((text) => ({ text }))}
            />
          )
      : !options && rows
      ? ({ [key!]: value }) => (
          <p className="m-0 truncate max-w-xs" title={value as string}>
            {value as string}
          </p>
        )
      : undefined;

  renderTable() {
    const { store, className: _, ...tableProps } = this.props;
    if (!store) return null;

    const { hasHeader, hasFooter, columns, editing } = this;
    const { indexKey, downloading, currentPage } = store;

    return (
      <Table>
        {hasHeader && (
          <TableHeader>
            <TableRow>
              {columns.map(
                ({ key, renderHead }, index) =>
                  (key || renderHead) && (
                    <TableHead key={key?.toString() || index}>
                      {typeof renderHead === "function"
                        ? renderHead(key!)
                        : renderHead || (key as string)}
                    </TableHead>
                  )
              )}
            </TableRow>
          </TableHeader>
        )}
        <TableBody>
          {!editing && downloading > 0 ? (
            <TableRow>
              <TableCell className="text-center p-3" colSpan={columns.length}>
                <div className="flex justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                </div>
              </TableCell>
            </TableRow>
          ) : (
            currentPage.map((data) => (
              <TableRow key={data[indexKey] as string}>
                {columns.map(
                  ({ key, renderBody }, index) =>
                    (key || renderBody) && (
                      <TableCell key={key?.toString() || index}>
                        {renderBody?.(data) || (key && data[key])}
                      </TableCell>
                    )
                )}
              </TableRow>
            ))
          )}
        </TableBody>

        {hasFooter && (
          <TableFooter>
            <TableRow>
              {columns.map(
                ({ key, renderFoot }, index) =>
                  (key || renderFoot) && (
                    <TableCell key={key?.toString() || index}>
                      {typeof renderFoot === "function"
                        ? renderFoot(key!)
                        : renderFoot || (key as string)}
                    </TableCell>
                  )
              )}
            </TableRow>
          </TableFooter>
        )}
      </Table>
    );
  }

  getList = debounce(({ pageIndex, pageSize }) => {
    const { store, filter } = this.props;

    if (store && store.downloading < 1)
      store.getList(filter, pageIndex, pageSize);
  }, 300);

  async deleteList(keys: IDType[]) {
    const { translator, store } = this.props;
    if (!store) return;

    if (confirm(translator.t("sure_to_delete_x", { keys })))
      for (const key of keys) await store.deleteOne(key);
  }

  render() {
    const {
      className = "overflow-auto flex flex-col gap-3",
      editable,
      deletable,
      filterFields,
      store,
      translator,
      onSubmit,
      onReset,
      striped,
      hover,
      responsive,
      ...props
    } = this.props;

    if (!store) return null;

    const { fieldSize } = this;
    const { t } = translator;
    const { indexKey, pageSize, pageIndex, pageCount, totalCount } = store;

    return (
      <div className={cn(className)} {...props}>
        <header className="sticky top-0 bg-background py-3 flex flex-col gap-3 border-b">
          {filterFields && (
            <RestForm
              className="flex flex-wrap items-center gap-3 pb-3 border-b"
              size={fieldSize}
              translator={translator}
              fields={filterFields}
              onSubmit={(filter) => store.getList(filter as F, 1)}
              onReset={() => store.getList({} as F, 1)}
            />
          )}
          <div className="flex justify-between items-center">
            <div className="flex gap-2">
              {deletable && (
                <Button
                  variant="destructive"
                  size={fieldSize}
                  onClick={() => this.deleteList(this.checkedKeys)}
                  disabled={this.checkedKeys.length === 0}
                >
                  {t("delete")}
                </Button>
              )}
              {editable && (
                <Button
                  size={fieldSize}
                  onClick={() =>
                    (store.currentOne[indexKey] = "" as D[keyof D])
                  }
                >
                  {t("create")}
                </Button>
              )}
            </div>
          </div>
        </header>

        {this.renderTable()}

        <footer className="flex justify-between items-center py-3 border-t">
          {!!totalCount && (
            <span className="mx-3 text-sm text-muted-foreground">
              {t("total_x_rows", { totalCount })}
            </span>
          )}

          <Pager
            {...{ pageSize, pageIndex, pageCount }}
            onChange={this.getList}
          />
        </footer>

        {editable && (
          <RestFormModal
            size={fieldSize}
            fields={this.columns.map(({ renderHead, ...field }) => ({
              ...field,
              renderLabel: renderHead,
            }))}
            {...{ store, translator, onSubmit }}
          />
        )}
      </div>
    );
  }
}
