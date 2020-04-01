export interface ILoginDTO {
  principal?: string;
  credential?: string;
  privileges?: {
    checked: string[];
    halfChecked: string[];
  };
}
