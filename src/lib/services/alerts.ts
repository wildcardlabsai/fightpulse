import { FIXTURE_ALERTS } from "@/lib/data/fixtures";
import type { Alert } from "@/lib/types";

export const alerts = {
  async getAll(): Promise<Alert[]> {
    return FIXTURE_ALERTS;
  },

  async getUnread(): Promise<Alert[]> {
    return FIXTURE_ALERTS.filter((a) => !a.read);
  },

  async getByFight(fightId: string): Promise<Alert[]> {
    return FIXTURE_ALERTS.filter((a) => a.fightId === fightId);
  },
};
