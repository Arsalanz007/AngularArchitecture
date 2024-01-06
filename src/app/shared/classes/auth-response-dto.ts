export class AuthUserResponseDTO {
    id: bigint;
    email: string;
    firstName: string;
    lastName: string;
    role: string;
    token: string;
    expireOn: string;
    constructor(){
      this.id = BigInt(0),
      this.email = '',
      this.firstName = '',
      this.lastName = '',
      this.role = '',
      this.token = '',
      this.expireOn = ''
    }
  }