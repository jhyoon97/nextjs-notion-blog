import type {
  BlockObjectResponse,
  RichTextItemResponse,
  ParagraphBlockObjectResponse,
  BulletedListItemBlockObjectResponse,
  NumberedListItemBlockObjectResponse,
  ToggleBlockObjectResponse,
  QuoteBlockObjectResponse,
  Heading1BlockObjectResponse,
  Heading2BlockObjectResponse,
  Heading3BlockObjectResponse,
  ColumnListBlockObjectResponse,
  ColumnBlockObjectResponse,
  CalloutBlockObjectResponse,
  TableBlockObjectResponse,
  TableRowBlockObjectResponse,
  ToDoBlockObjectResponse,
} from "@notionhq/client/build/src/api-endpoints";

// children 추가
interface HasChildrenParagraphBlockObject
  extends Pick<
    ParagraphBlockObjectResponse["paragraph"],
    "rich_text" | "color"
  > {
  children?: Array<HasChildrenBlockObject>;
}

export interface HasChildrenParagraph
  extends Omit<ParagraphBlockObjectResponse, "paragraph"> {
  paragraph: HasChildrenParagraphBlockObject;
}

interface HasChildrenBulletedListBlockObject
  extends Pick<
    BulletedListItemBlockObjectResponse["bulleted_list_item"],
    "rich_text" | "color"
  > {
  children?: Array<HasChildrenBlockObject>;
}

export interface HasChildrenBulletedList
  extends Omit<BulletedListItemBlockObjectResponse, "bulleted_list_item"> {
  bulleted_list_item: HasChildrenBulletedListBlockObject;
}

interface HasChildrenNumberedListItemBlockObject
  extends Pick<
    NumberedListItemBlockObjectResponse["numbered_list_item"],
    "rich_text" | "color"
  > {
  children?: Array<HasChildrenBlockObject>;
}

export interface HasChildrenNumberedList
  extends Omit<NumberedListItemBlockObjectResponse, "numbered_list_item"> {
  numbered_list_item: HasChildrenNumberedListItemBlockObject;
}

interface HasChildrenTobbleBlockObject
  extends Pick<ToggleBlockObjectResponse["toggle"], "rich_text" | "color"> {
  children?: Array<HasChildrenBlockObject>;
}

export interface HasChildrenToggle
  extends Omit<ToggleBlockObjectResponse, "toggle"> {
  toggle: HasChildrenTobbleBlockObject;
}

interface HasChildrenQuoteBlockObject
  extends Pick<QuoteBlockObjectResponse["quote"], "rich_text" | "color"> {
  children?: Array<HasChildrenBlockObject>;
}

export interface HasChildrenQuote
  extends Omit<QuoteBlockObjectResponse, "quote"> {
  quote: HasChildrenQuoteBlockObject;
}

interface HasChildrenColumnListBlockObject {
  children?: Array<HasChildrenColumn>;
}

export interface HasChildrenColumnList
  extends Omit<ColumnListBlockObjectResponse, "column_list"> {
  column_list: HasChildrenColumnListBlockObject;
}

interface HasChildrenColumnBlockObject {
  children?: Array<HasChildrenBlockObject>;
}

export interface HasChildrenColumn
  extends Omit<ColumnBlockObjectResponse, "column"> {
  column: HasChildrenColumnBlockObject;
}

interface HasChildrenCalloutBlockObject
  extends Pick<
    CalloutBlockObjectResponse["callout"],
    "rich_text" | "color" | "icon"
  > {
  children?: Array<HasChildrenBlockObject>;
}

export interface HasChildrenCallout
  extends Omit<CalloutBlockObjectResponse, "callout"> {
  callout: HasChildrenCalloutBlockObject;
}

interface HasChildrenTableBlockObject
  extends Pick<
    TableBlockObjectResponse["table"],
    "has_column_header" | "has_row_header" | "table_width"
  > {
  children?: Array<TableRowBlockObjectResponse>;
}

export interface HasChildrenTable
  extends Omit<TableBlockObjectResponse, "table"> {
  table: HasChildrenTableBlockObject;
}

interface HasChildrenToDoBlockObject
  extends Pick<
    ToDoBlockObjectResponse["to_do"],
    "checked" | "color" | "rich_text"
  > {
  children?: Array<HasChildrenBlockObject>;
}

export interface HasChildrenToDo
  extends Omit<ToDoBlockObjectResponse, "to_do"> {
  to_do: HasChildrenToDoBlockObject;
}

interface HasChildrenToggleableHeading1BlockObject
  extends Pick<
    Heading1BlockObjectResponse["heading_1"],
    "rich_text" | "color"
  > {
  is_toggleable?: boolean;
  children?: Array<HasChildrenBlockObject>;
}

export interface HasChildrenToggleableHeading1
  extends Omit<Heading1BlockObjectResponse, "heading_1"> {
  heading_1: HasChildrenToggleableHeading1BlockObject;
}

interface HasChildrenToggleableHeading2BlockObject
  extends Pick<
    Heading2BlockObjectResponse["heading_2"],
    "rich_text" | "color"
  > {
  is_toggleable?: boolean;
  children?: Array<HasChildrenBlockObject>;
}

export interface HasChildrenToggleableHeading2
  extends Omit<Heading2BlockObjectResponse, "heading_2"> {
  heading_2: HasChildrenToggleableHeading2BlockObject;
}

interface HasChildrenToggleableHeading3BlockObject
  extends Pick<
    Heading3BlockObjectResponse["heading_3"],
    "rich_text" | "color"
  > {
  is_toggleable?: boolean;
  children?: Array<HasChildrenBlockObject>;
}

export interface HasChildrenToggleableHeading3
  extends Omit<Heading3BlockObjectResponse, "heading_3"> {
  heading_3: HasChildrenToggleableHeading3BlockObject;
}

export type HasChildrenBlockObject =
  | BlockObjectResponse
  | HasChildrenParagraph
  | HasChildrenBulletedList
  | HasChildrenNumberedList
  | HasChildrenToggle
  | HasChildrenQuote
  | HasChildrenColumnList
  | HasChildrenCallout
  | HasChildrenTable
  | HasChildrenToDo
  | HasChildrenToggleableHeading1
  | HasChildrenToggleableHeading2
  | HasChildrenToggleableHeading3;

// NotionRenderer
export interface BlockGroup {
  groupType: "bulleted_list_item" | "numbered_list_item" | "to_do";
  blocks: Array<HasChildrenBlockObject>;
}

export type ProcessedBlock = HasChildrenBlockObject | BlockGroup;

export type ProcessedBlockArray = Array<ProcessedBlock>;

// NotionRenderer/RichText
export interface RichTextGroup {
  groupType: "code" | "link";
  richText: Array<RichTextItemResponse | RichTextGroup>;
}

export type ProcessedRichTextItem = RichTextItemResponse | RichTextGroup;

export type ProcessedRichTextArray = Array<ProcessedRichTextItem>;
