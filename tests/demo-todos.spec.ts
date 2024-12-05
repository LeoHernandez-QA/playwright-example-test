/**
 * To run specific tests:
 * npx playwright test demo-todos.spec.ts
 * 
 * To run files that have landing, login or example in the file name:
 * npx playwright test landing login example
 * 
 * To run a test with a specific title:
 * npx playwright test -g "specific title here"]
 * 
 * To run only the tests that failed in the last test run:
 * npx playwright test --last-failed
 * 
 * Run your tests with the --debug flag to open the inspector
 * npx playwright test demo-todos.spec.ts --debug
 * 
 * Debugging only the test that starts at line 11:
 * npx playwright test demo-todos.spec.ts:11 --debug
 * 
 * To open last HML report run:
 * npx playwright show-report 
 * 
 * To run tests in UI Mode:
 * npx playwright test --ui
 * 
 * To see how Playwright interacts with the website
 * npx playwright test --headed
 * 
 * To specify which browser tests will run (allow multi browsers like below):
 * npx playwright test --project firefox --project chromium
 */

import { test, expect } from '@playwright/test';

test.describe('First try todo mvc', () => {

	const alpha = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm'];

	test('Add todos and check persistence', async ({ page }) => {
		await page.goto('https://demo.playwright.dev/todomvc/#/');
		await page.getByPlaceholder('What needs to be done?').click();
		await page.getByPlaceholder('What needs to be done?').fill('Learn how codegen works');
		await page.getByPlaceholder('What needs to be done?').press('Enter');
		await page.getByPlaceholder('What needs to be done?').fill('Add other todo');
		await page.getByPlaceholder('What needs to be done?').press('Enter');
		await page.getByPlaceholder('What needs to be done?').fill('Add one last todo');
		await page.getByPlaceholder('What needs to be done?').press('Enter');

		async function testing(alpha) {
			for (const letter of alpha) {
				await page.getByPlaceholder('What needs to be done?').fill(`${letter}`);
				await page.getByPlaceholder('What needs to be done?').press('Enter');
			}
		}

		await testing(alpha);

		await page.locator('li').filter({ hasText: 'Add one last todo' }).getByLabel('Toggle Todo').check();
		await page.locator('li').filter({ hasText: 'Add other todo' }).getByLabel('Toggle Todo').check();
		await page.getByRole('link', { name: 'Active' }).click();
		await expect(page.getByTestId('todo-title')).toContainText('Learn how codegen works');
		await page.getByRole('link', { name: 'Completed' }).click();
		await expect(page.locator('body')).toContainText('Add other todo');
		await page.getByText('Add one last todo').click();
		await expect(page.locator('body')).toContainText('Add one last todo');
		await page.getByRole('button', { name: 'Clear completed' }).click();
		await page.getByRole('link', { name: 'All' }).click();
	})
})