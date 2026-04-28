"use client";

let _persistor = null;

export const setPersistor = (p) => {
  _persistor = p;
};

export const getPersistor = () => _persistor;
