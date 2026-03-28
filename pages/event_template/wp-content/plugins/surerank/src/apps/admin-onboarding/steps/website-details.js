import { __ } from '@wordpress/i18n';
import { renderField } from '../utils';
import StepNavButtons from '../components/nav-buttons';
import {
	Fragment,
	useState,
	useEffect,
	useMemo,
	useRef,
	useCallback,
} from '@wordpress/element';
import { useOnboardingState } from '@Onboarding/store';
import { Title, Label, Button, Tooltip, Text, toast } from '@bsf/force-ui';
import apiFetch from '@wordpress/api-fetch';
import { InfoTooltip } from '@AdminComponents/tooltip';
import { Sparkles } from 'lucide-react';
import { cn } from '@/functions/utils';
import useOnboardingAuth from '@Onboarding/hooks/use-onboarding-auth';

const IMPROVE_WITH_AI_TEXT = __( 'Improve with AI', 'surerank' );
const IMPROVING_TEXT = __( 'Improving…', 'surerank' );

const websiteTypes = [
	{
		label: __( 'Personal Website', 'surerank' ),
		value: 'personal',
	},
	{
		label: __( 'Business Website', 'surerank' ),
		value: 'business',
	},
	{
		label: __( 'Organization', 'surerank' ),
		value: 'organization',
	},
	{
		label: __( 'Personal Blog', 'surerank' ),
		value: 'blog',
	},
	{
		label: __( 'Community Blog/News Website', 'surerank' ),
		value: 'community',
	},
	{
		label: __( 'E-commerce Store', 'surerank' ),
		value: 'ecommerce',
	},
];

const WebsiteDetails = () => {
	const [ { pages = [], websiteDetails = {} }, dispatch ] =
		useOnboardingState();

	const organizationOptions = Object.values(
		surerank_globals?.schema_type_options?.Organization || {}
	);

	const [ formState, setFormState ] = useState( websiteDetails );
	const [ pageOptions, setPageOptions ] = useState( pages ); // Local state for pages
	const [ isImprovingDescription, setIsImprovingDescription ] =
		useState( false );

	const { isAuthenticated, isConnecting, handleConnect } = useOnboardingAuth(
		{ skipCheck: true }
	);

	const shouldAutoImprove = useRef( false );

	/**
	 * Fetch pages from the custom posts-list API
	 * This searches only by page title (not content) for more accurate results
	 * @param {string} search - Search query
	 * @return {Promise<Array>} Array of page objects with label and value
	 */
	const fetchPages = async ( search = '' ) => {
		try {
			const response = await apiFetch( {
				path: `/surerank/v1/posts-list?post_type=page&per_page=200${
					search ? `&search=${ encodeURIComponent( search ) }` : ''
				}`,
				method: 'GET',
			} );

			// Response is already in {label, value} format from the backend
			return response;
		} catch ( error ) {
			return [];
		}
	};

	useEffect( () => {
		const loadInitialPages = async () => {
			try {
				const pagesData = await fetchPages();
				dispatch( { pages: pagesData } );
				setPageOptions( pagesData ); // Update local state
			} catch ( error ) {
				dispatch( { pages: [] } );
				setPageOptions( [] );
			}
		};
		loadInitialPages();
	}, [] );

	// Sync formState and dispatch websiteDetails
	useEffect( () => {
		const details = surerank_admin_common?.website_details;
		const data = {
			website_type:
				websiteDetails?.website_type ||
				details?.website_represents ||
				'',
			website_name:
				websiteDetails?.website_name || details?.website_name || '',
			website_owner_name:
				websiteDetails?.website_owner_name ||
				details?.website_owner_name ||
				'',
			organization_type:
				websiteDetails?.organization_type || 'Organization',
			website_owner_phone:
				websiteDetails?.website_owner_phone ||
				details?.website_owner_phone ||
				'',
			business_description:
				websiteDetails?.business_description ||
				details?.business_description ||
				'',
			website_logo:
				websiteDetails?.website_logo || details?.website_logo || '',
			about_page:
				websiteDetails?.about_page || details?.website_about_us || '',
			contact_page:
				websiteDetails?.contact_page ||
				details?.website_contact_us ||
				'',
		};

		dispatch( {
			websiteDetails: data,
		} );

		setFormState( data );
	}, [] );

	const handleChangeSelection = ( name ) => ( value ) => {
		setFormState( ( prev ) => ( {
			...prev,
			[ name ]: value?.value ?? value,
		} ) );
	};

	/**
	 * Count words in a string
	 * @param {string} text - Text to count words in
	 * @return {number} Word count
	 */
	const countWords = ( text ) => {
		if ( ! text || typeof text !== 'string' ) {
			return 0;
		}
		return text.trim().split( /\s+/ ).filter( Boolean ).length;
	};

	/**
	 * Improve business description with AI
	 */
	const handleImproveDescription = useCallback( async () => {
		const description = formState.business_description;
		const wordCount = countWords( description );

		// Check if description has more than 10 words
		if ( wordCount < 5 ) {
			toast.error(
				__(
					'Please add at least 5 words to your description before improving.',
					'surerank'
				)
			);
			return;
		}

		setIsImprovingDescription( true );

		try {
			const response = await apiFetch( {
				path: '/surerank/v1/onboarding/improve-description',
				method: 'POST',
				data: {
					business_name: formState.website_name || '',
					business_desc: description,
					business_category: formState.organization_type || '',
					language: 'en',
				},
			} );

			if ( response?.success && response?.description ) {
				setFormState( ( prev ) => ( {
					...prev,
					business_description: response.description,
				} ) );
				toast.success(
					__( 'Description improved successfully!', 'surerank' )
				);
			} else {
				throw new Error( 'Invalid response format' );
			}
		} catch ( error ) {
			toast.error(
				__(
					'Failed to improve description. Please try again.',
					'surerank'
				),
				{
					description: error?.message || '',
				}
			);
		} finally {
			setIsImprovingDescription( false );
		}
	}, [
		formState.business_description,
		formState.website_name,
		formState.organization_type,
	] );

	useEffect( () => {
		if ( isAuthenticated && shouldAutoImprove.current ) {
			shouldAutoImprove.current = false;
			handleImproveDescription();
		}
	}, [ isAuthenticated, handleImproveDescription ] );

	const handleConnectAndImprove = () => {
		shouldAutoImprove.current = true;
		handleConnect();
	};

	// Calculate current word count for styling
	const currentWordCount = useMemo(
		() => countWords( formState.business_description ),
		[ formState.business_description ]
	);
	const hasMinimumWords = currentWordCount >= 5;

	// Calculate textarea rows dynamically based on content (min 4, max 8)
	const textareaRows = useMemo( () => {
		const text = formState.business_description || '';
		const lineBreaks = ( text.match( /\n/g ) || [] ).length + 1;
		const textLength = text.length;

		const calculatedRows = Math.max(
			lineBreaks,
			Math.ceil( textLength / 60 )
		);

		return Math.min( Math.max( calculatedRows, 4 ), 8 );
	}, [ formState.business_description ] );

	const baseFields = [
		{
			label: __( 'This Website Represents', 'surerank' ),
			name: 'website_type',
			type: 'select',
			options: websiteTypes || [],
			width: 'half',
		},
		{
			label: __( 'Organization Type', 'surerank' ),
			name: 'organization_type',
			type: 'selectGroup',
			options: organizationOptions,
			width: 'half',
			conditionalOn: 'website_type',
			conditionalValues: [
				'business',
				'organization',
				'ecommerce',
				'community',
			],
		},
		{
			label: __( 'Website Name', 'surerank' ),
			name: 'website_name',
			type: 'text',
			width: 'half',
			conditionalOn: 'website_type',
			conditionalValues: [
				'business',
				'organization',
				'ecommerce',
				'community',
			],
		},
		{
			label: __( 'Phone Number (Optional)', 'surerank' ),
			name: 'website_owner_phone',
			type: 'text',
			width: 'half',
		},
		{
			label: (
				<>
					<div className="flex items-center justify-between gap-2 w-full">
						<div className="flex items-center justify-start gap-1">
							<Label tag="span" size="sm">
								{ __( 'Describe what you do', 'surerank' ) }
							</Label>
							<InfoTooltip
								content={ __(
									'Please describe what you do in a few sentences. This description will be used for content generation and other purposes.',
									'surerank'
								) }
							/>
						</div>
						{ isAuthenticated && hasMinimumWords && (
							<Button
								variant="outline"
								size="xs"
								icon={
									<Sparkles
										className={ cn(
											isImprovingDescription &&
												'animate-pulse'
										) }
									/>
								}
								iconPosition="left"
								onClick={ handleImproveDescription }
								className={ cn(
									'text-background-brand',
									isImprovingDescription &&
										'cursor-not-allowed'
								) }
							>
								{ isImprovingDescription
									? IMPROVING_TEXT
									: IMPROVE_WITH_AI_TEXT }
							</Button>
						) }
						{ isAuthenticated && ! hasMinimumWords && (
							<Tooltip
								variant="dark"
								placement="top-end"
								title={ __(
									'Minimum word count required',
									'surerank'
								) }
								content={
									<Text
										size={ 12 }
										weight={ 400 }
										color="inverse"
										className="leading-relaxed"
									>
										{ __(
											'Please add at least 5 words to your description before improving.',
											'surerank'
										) }
									</Text>
								}
								triggers={ [ 'hover' ] }
								tooltipPortalId="surerank-root"
								arrow={ true }
							>
								<Button
									variant="outline"
									size="xs"
									icon={ <Sparkles /> }
									iconPosition="left"
									className="text-icon-secondary cursor-not-allowed"
									onClick={ ( e ) => e.preventDefault() }
								>
									{ IMPROVE_WITH_AI_TEXT }
								</Button>
							</Tooltip>
						) }
						{ ! isAuthenticated && (
							<Tooltip
								variant="dark"
								placement="top-end"
								title={ __(
									'Connect with AI to improve this',
									'surerank'
								) }
								content={
									<div className="space-y-1">
										<Text
											size={ 12 }
											weight={ 400 }
											color="inverse"
											className="leading-relaxed"
										>
											{ __(
												"To generate better content with AI, you'll need to connect your AI provider first. It only takes a minute and unlocks all AI-powered features.",
												'surerank'
											) }
										</Text>
										<div className="mt-1.5">
											<Button
												size="xs"
												variant="link"
												onClick={
													handleConnectAndImprove
												}
												disabled={ isConnecting }
												className="[&>span]:px-0 no-underline hover:no-underline focus:[box-shadow:none] text-link-visited-inverse hover:text-link-visited-inverse-hover"
											>
												{ isConnecting
													? __(
															'Connecting…',
															'surerank'
													  )
													: __(
															'Connect',
															'surerank'
													  ) }
											</Button>
										</div>
									</div>
								}
								triggers={ [ 'hover' ] }
								interactive={ true }
								tooltipPortalId="surerank-root"
								arrow={ true }
							>
								<Button
									variant="outline"
									size="xs"
									icon={ <Sparkles /> }
									iconPosition="left"
									className={
										hasMinimumWords
											? 'text-background-brand'
											: 'text-icon-secondary'
									}
								>
									{ IMPROVE_WITH_AI_TEXT }
								</Button>
							</Tooltip>
						) }
					</div>
				</>
			),
			name: 'business_description',
			type: 'textarea',
			width: 'full',
			rows: textareaRows,
		},
		{
			label: __( 'Website Owner Name', 'surerank' ),
			name: 'website_owner_name',
			type: 'text',
			width: 'half',
			conditionalOn: 'website_type',
			conditionalValues: [ 'personal', 'blog' ],
		},
		{
			label: __( 'Website Logo', 'surerank' ),
			name: 'website_logo',
			type: 'file',
			width: 'full',
			accept: 'image/*',
			description: __(
				'Recommended Logo size 112 X 112 or more, PNG / JPG format',
				'surerank'
			),
		},
	];

	const loadingFields = useMemo(
		() => [
			{
				label: __( 'Select About Page', 'surerank' ),
				name: 'about_page',
				type: 'select',
				defaultValue: formState?.about_page || {},
				options: pageOptions || [],
				width: 'half',
				combobox: true,
				by: 'value',
				searchFn: fetchPages,
			},
			{
				label: __( 'Select Contact Page', 'surerank' ),
				name: 'contact_page',
				type: 'select',
				defaultValue: formState?.contact_page || {},
				options: pageOptions || [],
				width: 'half',
				combobox: true,
				searchFn: fetchPages,
				by: 'value',
			},
		],
		[ pageOptions, formState ]
	);

	const handleSaveForm = () => {
		dispatch( { websiteDetails: formState } );
	};

	// Filter fields based on their conditions
	const filteredFields = baseFields.filter( ( field ) => {
		if ( field.conditionalOn === undefined ) {
			return true;
		}
		return field.conditionalValues?.includes(
			formState[ field.conditionalOn ]
		);
	} );

	return (
		<div className="flex flex-col gap-6">
			<div className="space-y-1">
				<Title
					tag="h4"
					title={ __( 'Your Website Basic Details', 'surerank' ) }
					size="md"
				/>
				<p>
					{ __(
						'Let’s start with some basic information about your website. This info helps personalize your site and may be used in things like search results, structured data, and public details about your site.',
						'surerank'
					) }
				</p>
			</div>

			<div className="flex flex-wrap gap-6">
				{ filteredFields.map( ( field, index ) => (
					<Fragment key={ field.name }>
						{ renderField(
							field,
							formState[ field.name ],
							handleChangeSelection( field.name ),
							null,
							{
								initialFocus: index === 0,
							}
						) }
					</Fragment>
				) ) }
				{ loadingFields.map( ( field ) => (
					<Fragment key={ field.name }>
						{ renderField(
							field,
							formState[ field.name ] ?? '',
							handleChangeSelection( field.name )
						) }
					</Fragment>
				) ) }
			</div>
			<StepNavButtons
				nextProps={ {
					onClick: handleSaveForm,
				} }
				backProps={ {
					onClick: handleSaveForm,
				} }
			/>
		</div>
	);
};

export default WebsiteDetails;
