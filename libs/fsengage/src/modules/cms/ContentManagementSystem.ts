import type ContentManagementSystemProvider from './providers/ContentManagementSystemProvider';
import ContentManagementSystemLocator from './requesters/ContentManagementSystemLocator';

export default class ContentManagementSystem {
  constructor(provider: ContentManagementSystemProvider) {
    this.provider = provider;
    this.locator = new ContentManagementSystemLocator();
  }

  private readonly provider: ContentManagementSystemProvider;
  private locator: ContentManagementSystemLocator;

  private log(group: string, slot: string, identifier?: string): void {
    console.log(
      `%cContentManagementSystem\n%c group: ${group}\n slot: ${slot}${
        identifier ? `\n identifier: ${identifier}` : ''
      }`,
      'color: blue',
      'color: grey'
    );
  }

  public set shouldPromptForGelolocationPermission(permission: boolean) {
    this.locator.shouldPromptForGelolocationPermission = permission;
  }

  public set shouldFallbackToGeoIP(permission: boolean) {
    this.locator.shouldFallbackToGeoIP = permission;
  }

  public async contentForSlot(group: string, slot: string, identifier?: string): Promise<{}> {
    if (__DEV__) {
      this.log(group, slot, identifier);
    }

    return this.provider.contentForSlot(group, slot, identifier, {
      locator: this.locator,
    });
  }

  public async contentForGroup(group: string): Promise<{}> {
    return this.provider.contentForGroup(group);
  }

  public async identifiersForSlot(group: string, slot: string): Promise<string[] | null> {
    if (__DEV__) {
      this.log(group, slot);
    }

    return this.provider.identifiersForSlot(group, slot);
  }
}
