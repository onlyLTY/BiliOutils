from wasmer import engine, Store, Module, Instance

store = Store()

# Let's compile the module to be able to execute it!
module = Module(store, open('add.wasm', 'rb').read())

# Now the module is compiled, we can instantiate it.
instance = Instance(module)

# Call the exported `sum` function.
result = instance.exports.add(5, 37)

print(result) # 42!