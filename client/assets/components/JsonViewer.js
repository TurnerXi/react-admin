import React from 'react';
import ReactJson from 'react-json-view';

const initialConfig = {
  theme: 'rjv-default',
  iconStyle: 'circle',
  indentWidth: 4,
  enableClipboard,
};
/**
 * @param theme	string	"rjv-default"
 * RJV supports base-16 themes.
 * Check out the list of supported themes in the demo. A custom "rjv-default" theme applies by default.
 *
 * @param style	object	{}
 * Style attributes for react-json-view container.
 * Explicit style attributes will override attributes provided by a theme.
 *
 * @param iconStyle	string	"circle"
 * Style of expand/collapse icons. Accepted values are "circle", triangle" or "square".
 *
 * @param indentWidth	integer	4
 * Set the indent-width for nested objects
 *
 * @param collapsed	boolean or integer	false
 * When set to true, all nodes will be collapsed by default.
 * Use an integer value to collapse at a particular depth.
 *
 * @param collapseStringsAfterLength	integer	false
 * When an integer value is assigned, strings will be cut off at that length.
 * Collapsed strings are followed by an ellipsis.
 * String content can be expanded and collapsed by clicking on the string value.
 *
 * @param shouldCollapse	(field)=>{}	false
 * Callback function to provide control over what objects and arrays should be collapsed by default.
 * An object is passed to the callback containing name, src, type ("array" or "object") and namespace.
 *
 * @param groupArraysAfterLength	integer	100
 * When an integer value is assigned, arrays will be displayed in groups by count of the value.
 * Groups are displayed with brakcet notation and can be expanded and collapsed by clickong on the brackets.
 *
 * @param enableClipboard	boolean or (copy)=>{}	true
 * When prop is not false, the user can copy objects and arrays to clipboard by clicking on the clipboard icon.
 * Copy callbacks are supported.
 *
 * @param displayObjectSize	boolean	true
 * When set to true, objects and arrays are labeled with size
 * @param displayDataTypes	boolean	true
 * When set to true, data type labels prefix values
 *
 * @param onEdit	(edit)=>{}	false
 * When a callback function is passed in, edit functionality is enabled.
 * The callback is invoked before edits are completed.
 * Returning false from onEdit will prevent the change from being made. see: onEdit docs
 *
 * @param onAdd	(add)=>{}	false
 * When a callback function is passed in, add functionality is enabled.
 * The callback is invoked before additions are completed.
 * Returning false from onAdd will prevent the change from being made. see: onAdd docs
 *
 * @param defaultValue	string |number |boolean |array |object	null
 * Sets the default value to be used when adding an item to json
 *
 * @param onDelete	(delete)=>{}	false
 * When a callback function is passed in, delete functionality is enabled.
 * The callback is invoked before deletions are completed.
 * Returning false from onDelete will prevent the change from being made. see: onDelete docs
 *
 * @param onSelect	(select)=>{}	false
 * When a function is passed in, clicking a value triggers the onSelect method to be called.
 *
 * @param sortKeys	boolean	false
 * set to true to sort object keys
 *
 * @param validationMessage	string	"Validation Error"
 * Custom message for validation failures to onEdit, onAdd, or onDelete callbacks
 */
export default function({ src, ...props }) {
  const config = { ...initialConfig, ...props };
  return <ReactJson src={src} {...config} />;
}
