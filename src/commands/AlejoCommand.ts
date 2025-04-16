import { CommandRegistry, Player, World, TargetEnum, WorldEnum, Entity } from "@serenityjs/core";

import { TestPlugin } from "..";

function register(world: World, _plugin: TestPlugin): void {
  world.commandPalette.register(
    "alejocommand",
    "alejo command description",
    (registry: CommandRegistry) => {
      registry.permissions = ["serenity.operator"];

      registry.overload(
        {
          target: TargetEnum,
         
        },
        (ctx) => {
          const targets = ctx.target.result as Entity[];
          const player = targets[0] as Player;

          return { 
            message: `§7You are the player: §c${player.username}` };
        }
      );
    },
    () => { throw new Error("No overloads matched selector."); },
  );
}
export default register;
