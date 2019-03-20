/**
* Public interface for user model
*/
export interface ILocalizable {
  zh_hk?: String;
  en_us?: String;
}

export const Localizable = (opts: any) => ({
  zh_hk: { type: String, ...opts },
  en_us: { type: String, ...opts },
});
