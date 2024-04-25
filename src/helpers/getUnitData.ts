import type { Asset, Location, UnitData } from '@/types'
import apexAssets from '../../public/data/units/apex/assets.json'
import apexLocations from '../../public/data/units/apex/locations.json'
import jaguarAssets from '../../public/data/units/jaguar/assets.json'
import jaguarLocations from '../../public/data/units/jaguar/locations.json'
import tobiasAssets from '../../public/data/units/tobias/assets.json'
import tobiasLocations from '../../public/data/units/tobias/locations.json'

export const getUnitData = (unit: string): UnitData | undefined =>
  ({
    apex: {
      assets: apexAssets as Asset[],
      locations: apexLocations as Location[],
    },
    jaguar: {
      assets: jaguarAssets as Asset[],
      locations: jaguarLocations as Location[],
    },
    tobias: {
      assets: tobiasAssets as Asset[],
      locations: tobiasLocations as Location[],
    },
  })[unit]
