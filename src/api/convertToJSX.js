import React from "react";

export const getNodes = str =>
  new DOMParser().parseFromString(str, "text/html").body.childNodes;

export const createJSX = nodeArray => {
  return nodeArray.map(node => {
    let attributeObj = {};
    const {
      attributes,
      localName,
      childNodes,
      nodeValue,
    } = node;
    if (attributes) {
      Array.from(attributes).forEach(attribute => {
        if (attribute.name === "style") {
          let styleAttributes = attribute.nodeValue.split(";");
          let styleObj = {};
          styleAttributes.forEach(attribute => {
            let [key, value] = attribute.split(":");
            styleObj[key] = value;
          });
          attributeObj[attribute.name] = styleObj;
        } else {
          attributeObj[attribute.name] = attribute.nodeValue;
        }
      });
    }
    return localName ?
      React.createElement(
        localName,
        attributeObj,
        childNodes && Array.isArray(Array.from(childNodes)) ?
          createJSX(Array.from(childNodes)) :
          []
      ) :
      nodeValue;
  });
};