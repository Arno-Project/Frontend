import { Metric } from "../models";
import { BaseListAPI } from "./base";

export class MetricsAPI extends BaseListAPI {
    protected static instance: MetricsAPI;
  
    private constructor(base_path: string = "feedback") {
      super(base_path, "metric/");
    }
  
    public static getInstance(): MetricsAPI {
      if (!MetricsAPI.instance) {
        MetricsAPI.instance = new MetricsAPI("feedback");
      }
      return MetricsAPI.instance;
    }
  }
