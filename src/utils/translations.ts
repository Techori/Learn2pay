
// Translation utility to ensure all text is in English
export const translations = {
  // Common UI elements
  'login': 'Login',
  'logout': 'Logout',
  'dashboard': 'Dashboard',
  'settings': 'Settings',
  'profile': 'Profile',
  'save': 'Save',
  'cancel': 'Cancel',
  'delete': 'Delete',
  'edit': 'Edit',
  'add': 'Add',
  'remove': 'Remove',
  'submit': 'Submit',
  'back': 'Back',
  'next': 'Next',
  'previous': 'Previous',
  'search': 'Search',
  'filter': 'Filter',
  'sort': 'Sort',
  'download': 'Download',
  'upload': 'Upload',
  'print': 'Print',
  'export': 'Export',
  'import': 'Import',
  
  // FeeMate specific
  'fee_collection': 'Fee Collection',
  'payment_methods': 'Payment Methods',
  'autopay': 'AutoPay',
  'due_date': 'Due Date',
  'payment_history': 'Payment History',
  'fee_schedule': 'Fee Schedule',
  'pending_payments': 'Pending Payments',
  'successful_payments': 'Successful Payments',
  'failed_payments': 'Failed Payments',
  'receipt': 'Receipt',
  'invoice': 'Invoice',
  'transaction_id': 'Transaction ID',
  'amount': 'Amount',
  'status': 'Status',
  'payment_gateway': 'Payment Gateway',
  'upi': 'UPI',
  'credit_card': 'Credit Card',
  'debit_card': 'Debit Card',
  'net_banking': 'Net Banking',
  'enach': 'E-Nach',
  'cash': 'Cash',
  'wallet': 'Digital Wallet',
  
  // Status messages
  'success': 'Success',
  'failed': 'Failed',
  'pending': 'Pending',
  'processing': 'Processing',
  'cancelled': 'Cancelled',
  'refunded': 'Refunded',
  
  // Common messages
  'welcome': 'Welcome',
  'thank_you': 'Thank You',
  'please_wait': 'Please Wait',
  'loading': 'Loading',
  'no_data': 'No Data Available',
  'error_occurred': 'An Error Occurred',
  'try_again': 'Try Again',
  'contact_support': 'Contact Support',
  
  // Institution types
  'school': 'School',
  'college': 'College',
  'university': 'University',
  'coaching_center': 'Coaching Center',
  'music_academy': 'Music Academy',
  'dance_academy': 'Dance Academy',
  'art_center': 'Art Center',
  'craft_center': 'Craft Center'
};

// Helper function to get translated text
export const translate = (key: string): string => {
  return translations[key as keyof typeof translations] || key;
};

// Helper function to ensure text is in English
export const ensureEnglish = (text: string): string => {
  // This function can be expanded to detect and translate Hindi text
  // For now, it returns the text as-is, but can be enhanced with translation APIs
  return text;
};
