import { CommandRegistry, ItemEnum, World, TargetEnum, WorldEnum } from "@serenityjs/core";

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
          item: ItemEnum,
          world: WorldEnum,
        },
        (ctx) => {
          const targets = ctx.target.result;
          const items = ctx.item.result; 
          const worlds = ctx.world.result;

          return { message: `§7Hello World! §eTargets§7:§c ${targets}, §eItem§7: §c${items}, §eworlds: §c${worlds}` };
        }
      );
    },
    () => { throw new Error("No overloads matched selector."); },
  );
}
export default register;
