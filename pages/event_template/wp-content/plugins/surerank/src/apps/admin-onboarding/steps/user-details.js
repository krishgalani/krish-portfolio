import apiFetch from '@wordpress/api-fetch';
import { ONBOARDING_URL } from '@Global/constants/api';

/**
 * Submit onboarding data to the API
 *
 * @param {Object} websiteDetails     - Website details from state
 * @param {Object} socialProfilesURLs - Social profiles from state
 * @return {Promise} API response
 */
export const submitOnboardingData = async (
	websiteDetails = {},
	socialProfilesURLs = {}
) => {
	const about_page =
		websiteDetails?.about_page?.value ?? websiteDetails?.about_page;
	const contact_page =
		websiteDetails?.contact_page?.value ?? websiteDetails?.contact_page;

	const payload = {
		website_type: websiteDetails.website_type || '',
		website_name: websiteDetails.website_name || '',
		website_owner_name: websiteDetails.website_owner_name || '',
		business_description: websiteDetails.business_description || '',
		organization_type: websiteDetails.organization_type || 'Organization',
		website_owner_phone: websiteDetails.website_owner_phone || '',
		website_logo: websiteDetails.website_logo?.url || '',
		about_page: about_page ? parseInt( about_page ) : 0,
		contact_page: contact_page ? parseInt( contact_page ) : 0,
		social_profiles: socialProfilesURLs || {},
	};

	return await apiFetch( {
		path: ONBOARDING_URL,
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify( payload ),
	} );
};
