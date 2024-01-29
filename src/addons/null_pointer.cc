#include <node.h>

namespace addon {

  void nullPointer(const v8::FunctionCallbackInfo<v8::Value>& args) {
    int* ptr = nullptr;
    *ptr = 10; // 尝试访问空指针

    args.GetReturnValue().SetUndefined();
  }

  void Init(v8::Local<v8::Object> exports) {
    NODE_SET_METHOD(exports, "nullPointer", nullPointer);
  }

  NODE_MODULE(NODE_GYP_MODULE_NAME, Init)

}  // namespace addon