import { __ } from '@wordpress/i18n';
import { useState, useEffect } from '@wordpress/element';
import { toast } from '@bsf/force-ui';
import { getAuth } from '@Functions/api';
import useAuthPolling from '@Global/hooks/use-auth-polling';

const getInitialAuthState = () => {
	const { ai_authenticated } = window.surerank_globals || {};

	return ai_authenticated;
};

const authCheckedRef = { current: false };
const authStateRef = { current: { isAuthenticated: getInitialAuthState() } };

// eslint-disable-next-line
/**
 * Custom hook for handling authentication in onboarding
 *
 * @param  {Object}   options          -   Configuration options
 * @param  {boolean}  options.skipCheck - Skip checking auth on mount (default: false)
 * @return {Object}                    -  Authentication state and handlers
 */
const useOnboardingAuth = ( { skipCheck = false } = {} ) => {
	const [ isAuthenticated, setIsAuthenticated ] = useState(
		authStateRef.current.isAuthenticated
	);
	const [ isConnecting, setIsConnecting ] = useState( false );

	// Auth success handler
	const handleAuthSuccess = () => {
		setIsConnecting( false );
		setIsAuthenticated( true );
		authStateRef.current.isAuthenticated = true;
	};

	// Auth failure handler
	const handleAuthFailure = () => {
		setIsConnecting( false );
	};

	// Initialize auth polling hook
	const { openAuthPopup } = useAuthPolling(
		handleAuthSuccess,
		handleAuthFailure
	);

	// Connect handler
	const handleConnect = async () => {
		setIsConnecting( true );

		try {
			const response = await getAuth();

			if ( ! response?.success || ! response?.auth_url ) {
				toast.error(
					__( 'Failed to get authentication URL', 'surerank' )
				);
				setIsConnecting( false );
				return;
			}

			// Open auth popup and start polling
			openAuthPopup( response.auth_url );
		} catch ( error ) {
			toast.error(
				__( 'An error occurred while connecting', 'surerank' ),
				{
					description: error?.message || '',
				}
			);
			setIsConnecting( false );
		}
	};

	// Mark as initialized on mount
	useEffect( () => {
		if ( ! skipCheck ) {
			authCheckedRef.current = true;
		}
	}, [] );

	return {
		isAuthenticated,
		isConnecting,
		handleConnect,
	};
};

export default useOnboardingAuth;
