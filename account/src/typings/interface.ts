export interface ILoginDTO {
  principal?: string,
  credential?: string,
  remember?: boolean,
}

export interface IResetDTO {
  newCredential: string,
  resetToken: string,
}
