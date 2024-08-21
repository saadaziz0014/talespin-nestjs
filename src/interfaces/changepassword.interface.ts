export interface ChangePassword {
    readonly email: string;
    readonly oldPassword: string;
    readonly newPassword: string;
}