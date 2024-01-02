import { Popper, UseAutocompleteReturnValue, useAutocomplete } from "@mui/base";
import { unstable_useForkRef as useForkRef } from "@mui/utils";
import React, {
  createContext,
  isValidElement,
  useContext,
  useRef,
} from "react";
import {
  ClearProps,
  IndicatorProps,
  InputProps,
  LabelProps,
  ListProps,
  OptionProps,
  RootProps,
  TagProps,
} from "./types";

const AutocompleteContext = createContext<UseAutocompleteReturnValue<
  unknown,
  boolean,
  boolean,
  boolean
> | null>(null);

const useAutocompleteContext = () => {
  const context = useContext(AutocompleteContext);
  if (!context) {
    throw new Error(
      "useAutocomplete must be used within an AutocompleteProvider"
    );
  }
  return context;
};

const Root = ({ children, ...props }: RootProps) => {
  const autocomplete = useAutocomplete(props);
  const ref = useRef(null);
  const rootRef = useForkRef(ref, autocomplete.setAnchorEl);
  const isFunction = typeof children === "function";

  return (
    <AutocompleteContext.Provider value={autocomplete}>
      <div ref={rootRef} {...autocomplete.getRootProps()}>
        {isFunction ? children(autocomplete) : children}
      </div>
    </AutocompleteContext.Provider>
  );
};

const Label = (props: LabelProps) => {
  const { getInputLabelProps } = useAutocompleteContext();
  return <label {...props} {...getInputLabelProps()} />;
};

const Clear = (props: ClearProps) => {
  const { getClearProps } = useAutocompleteContext();
  return <button {...props} {...getClearProps()} />;
};

const Tag = ({ index, children }: TagProps) => {
  const { getTagProps } = useAutocompleteContext();
  const { key, ...tagProps } = getTagProps({ index });
  return children?.(tagProps);
};

const Input = (props: InputProps) => {
  const { getInputProps } = useAutocompleteContext();
  return <input {...props} {...getInputProps()} />;
};

const Indicator = (props: IndicatorProps) => {
  const { getPopupIndicatorProps } = useAutocompleteContext();
  return (
    <button
      aria-label="popup indicator"
      {...props}
      {...getPopupIndicatorProps()}
    />
  );
};

const List = (props: ListProps) => {
  const { popupOpen, anchorEl, getListboxProps } = useAutocompleteContext();
  return (
    <Popper open={popupOpen} anchorEl={anchorEl}>
      <ul
        style={{ width: anchorEl?.clientWidth }}
        {...props}
        {...getListboxProps()}
      />
    </Popper>
  );
};

const Option = ({ option, index, ...props }: OptionProps) => {
  const { getOptionProps } = useAutocompleteContext();
  const { key, ...optionProps } = getOptionProps({ option, index }) as {
    key: React.Key;
  };
  return <li {...props} {...optionProps} />;
};

const Autocomplete = {
  Root,
  Label,
  Clear,
  Tag,
  Input,
  Indicator,
  List,
  Option,
};

export default Autocomplete;
