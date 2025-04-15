import { resolve } from "node:path";

import { Plugin, PluginEvents, PluginType } from "@serenityjs/plugins";

import { WorldEvent, World, PlayerJoinSignal, WorldEventSignals, WorldInitializeSignal } from "@serenityjs/core";
import { TestingCommands } from "./commands";

class TestPlugin extends Plugin {
  public readonly type = PluginType.Api;

  public constructor() {
    super("testplugin", "1.0.0");
  }

  public onInitialize(): void {
    this.logger.info("TestPlugin initialized successfully");
    this.serenity.on(WorldEvent.WorldInitialize, ({ world }) => {
      for (const register of TestingCommands) register(world, this);
    });
  }

  protected onPlayerJoin(event: PlayerJoinSignal): void {
    const message = `§7[§a+§7] §a${event.player.username} §7joined the game.`;
    this.logger.info(message);
    this.serenity.on(WorldEvent.PlayerJoin, (spawnEvent) => {
      if (spawnEvent.player.username === event.player.username) {
      this.broadcastMessage(message, event.player.username);
      }
    });
  }

  public broadcastMessage(message: string, excludeUsername?: string): void {
    for (const player of this.serenity.getPlayers()) {
      if (player.username !== excludeUsername) {
        player.sendMessage(message);
      }
    }
  }
}


export { TestPlugin };

export default new TestPlugin();
