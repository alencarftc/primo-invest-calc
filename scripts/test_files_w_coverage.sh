

MODULE_PATH=$1

pnpm test \
    --config=jest.config.ts \
    --coverage \
    --collectCoverageFrom="\"${MODULE_PATH}/**/*.{ts,tsx}\"" \
    $MODULE_PATH \
    --watch \
    --bail
