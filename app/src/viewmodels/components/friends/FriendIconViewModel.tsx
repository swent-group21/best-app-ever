/**
 * Friend Icon ViewModel component
 * @param name : name of the user
 * @returns the first letter of the name of the user to display
 */
export function useFriendIconViewModel({ name }: { readonly name: string }) {
  const firstLetter = name.charAt(0).toUpperCase();

  return { firstLetter };
}
