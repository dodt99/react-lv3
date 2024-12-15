import { useEffect, useRef, useState } from "react";

import "./index.css";

import { useClickOutside } from "../../hooks";

const FOCUS_REASON = {
  MOUSE: "mouse",
  KEY: "key",
};

const defaultFocusedOption = {
  index: -1,
  reason: undefined,
};

export const AutoFilterDropdown = ({
  valueChange,
  suggestions = [],
  optionLabel = "label",
  loading = false,
  dataKey,
  disabled,
  limit = 20,
  clearOnSelect = false,
  emptyMessage = "No results found.",
  placeholder,
  inputProps = {},
  inputStyle,
  inputClass = "",
  dropdownStyle,
  dropdownClass = "",
}) => {
  const rootRef = useRef();
  const dropdownRef = useRef();

  const [inputValue, setInputValue] = useState("");
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState(suggestions.slice(0, limit));
  const [focusedOption, setFocusedOption] = useState(defaultFocusedOption);

  const openDropdown = () => {
    if (!open) {
      setOpen(true);
    }
  };

  const closeDropdown = () => {
    if (open) {
      setOpen(false);
      setFocusedOption(defaultFocusedOption);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    openDropdown();
  };

  const handleSelect = (item) => {
    if (valueChange) {
      valueChange(item);
    }
    setInputValue(clearOnSelect ? "" : item[optionLabel]);
    closeDropdown();
  };

  const onOptionMouseMove = (index = -1) => {
    setFocusedOption({ index, reason: FOCUS_REASON.MOUSE });
  };

  const onArrowDownKey = (e) => {
    if (!open) return;
    e.preventDefault();
    const optionIndex = Math.min(options.length - 1, focusedOption.index + 1);
    setFocusedOption({ index: optionIndex, reason: FOCUS_REASON.KEY });
  };

  const onArrowUpKey = (e) => {
    if (!open) return;
    e.preventDefault();
    let optionIndex;
    if (focusedOption.index === -1) {
      optionIndex = options.length - 1;
    } else {
      optionIndex = Math.max(0, focusedOption.index - 1);
    }
    setFocusedOption({ index: optionIndex, reason: FOCUS_REASON.KEY });
  };

  const onEnterKey = (e) => {
    if (!open || focusedOption.index === -1) return;
    e.preventDefault();
    handleSelect(options[focusedOption.index]);
  };

  const onEscapeKey = (e) => {
    e.preventDefault();
    closeDropdown();
  };

  const onTabKey = (e) => {
    closeDropdown();
  };

  const onSpaceKey = (e) => {
    if (!open && !inputValue) {
      e.preventDefault();
      openDropdown();
    }
  };

  const handleKeyDown = (e) => {
    switch (e.code) {
      case "ArrowDown":
        onArrowDownKey(e);
        break;
      case "ArrowUp":
        onArrowUpKey(e);
        break;
      case "Enter":
        onEnterKey(e);
        break;
      case "Escape":
        onEscapeKey(e);
        break;
      case "Tab":
        onTabKey(e);
        break;
      case "Space":
        onSpaceKey(e);
        break;
      default:
        break;
    }
  };

  useClickOutside(rootRef, closeDropdown);

  // Update select options
  useEffect(() => {
    const newOptions = suggestions
      .filter((item) =>
        item[optionLabel]
          .toLowerCase()
          .includes(inputValue.trim().toLowerCase())
      )
      .slice(0, limit);
    setOptions(newOptions);
    setFocusedOption(defaultFocusedOption);
  }, [suggestions, inputValue, limit, optionLabel]);

  //Scroll focused option into view if using hot key
  useEffect(() => {
    if (dropdownRef.current && focusedOption.reason === FOCUS_REASON.KEY) {
      const focusIndex =
        focusedOption.index === -1 ? 1 : focusedOption.index + 1;
      const focusElement = dropdownRef.current.querySelector(
        `li:nth-of-type(${focusIndex})`
      );
      if (focusElement) {
        focusElement.scrollIntoView({ block: "nearest", inline: "start" });
      }
    }
  }, [focusedOption]);

  return (
    <div ref={rootRef} className="auto-filter">
      <input
        type="text"
        value={inputValue}
        disabled={disabled}
        placeholder={placeholder}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        onFocus={openDropdown}
        autoComplete="off"
        style={inputStyle}
        className={`input-text ${inputClass}`}
        {...inputProps}
      />

      {open && (
        <div
          ref={dropdownRef}
          style={dropdownStyle}
          className={`dropdown ${dropdownClass}`}
        >
          {loading ? (
            <p className="loading">Loading...</p>
          ) : options.length > 0 ? (
            <ul className="dropdown-list">
              {options.map((item, index) => (
                <li
                  key={dataKey ? item[dataKey] : index}
                  onClick={() => handleSelect(item)}
                  onMouseMove={() => onOptionMouseMove(index)}
                  className={`dropdown-item ${
                    focusedOption.index === index ? "focused" : ""
                  }`}
                  dangerouslySetInnerHTML={{
                    __html: highlightMatchingText(
                      item[optionLabel],
                      inputValue.trim()
                    ),
                  }}
                />
              ))}
            </ul>
          ) : (
            <p className="no-data">{emptyMessage}</p>
          )}
        </div>
      )}
    </div>
  );
};

function highlightMatchingText(text = "", searchQuery) {
  if (!searchQuery) return text;
  return text.replaceAll(
    new RegExp(`(${searchQuery})`, "gi"),
    (match) => `<b>${match}</b>`
  );
}
