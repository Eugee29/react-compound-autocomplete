import { UseAutocompleteProps, UseAutocompleteReturnValue } from "@mui/base";

export type RootProps = UseAutocompleteProps<
  unknown,
  boolean,
  boolean,
  boolean
> & {
  children?:
    | React.ReactNode
    | ((
        props: UseAutocompleteReturnValue<unknown, boolean, boolean, boolean>
      ) => React.ReactNode);
};

export type InputContainerProps = React.ComponentProps<"input">;

export type LabelProps = React.ComponentProps<"label">;

export type ClearProps = React.ComponentProps<"button">;

export type TagProps = { index: number } & {
  children?: (props: {
    "data-tag-index": number;
    tabIndex: -1;
    onDelete: (event: any) => void;
  }) => React.ReactNode;
};

export type InputProps = React.ComponentProps<"input">;

export type IndicatorProps = React.ComponentProps<"button">;

export type ListProps = React.ComponentProps<"ul">;

export type OptionProps = React.ComponentProps<"li"> & {
  option: unknown;
  index: number;
};
