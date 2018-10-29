import { RaffleService } from "./raffle";
import { SecretSantaService } from "./secretSanta";

angular
  .module("framework")
  .service("RaffleService", RaffleService)
  .service("SecretSantaService", SecretSantaService);
