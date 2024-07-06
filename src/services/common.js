const toKebabCase = (string) => {
    return string.replace(/[\s_]+/g, '-').toLowerCase();
};

export { toKebabCase };