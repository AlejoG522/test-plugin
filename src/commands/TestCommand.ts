import { CommandRegistry, Player, World, TargetEnum } from "@serenityjs/core";

import { TestPlugin } from "..";

function register(world: World, _plugin: TestPlugin): void {
  world.commandPalette.register(
    "testcommand",
    "testing command description",
    (registry: CommandRegistry) => {
      registry.permissions = ["serenity.operator"];

      registry.overload(
        {
          target: TargetEnum,
        },
        (ctx) => {
          const targets = ctx.target.result
  
          return { message: "Hello World!" }
        }
      );
    },
    () => { throw new Error("No overloads matched selector."); }, // Fallback
  );
}
export default register;
