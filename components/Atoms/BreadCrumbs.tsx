import { cn } from '@/lib/utils';
import { Icons } from '../icons';

type BreadCrumbProps = {
  name: string;
  href: string;
  isCurrent?: boolean;
  noChevron?: boolean;
};

type BreadCrumbsProps = {
  breadCrumbs: BreadCrumbProps[];
};

export const BreadCrumbs = ({ breadCrumbs }: BreadCrumbsProps) => (
  <nav className="flex" aria-label="Breadcrumb">
    <ol role="list" className="flex items-center space-x-2">
      {breadCrumbs.map((crumb, i) => (
        <BreadCrumb {...crumb} noChevron={i === 0} key={crumb.href} />
      ))}
    </ol>
  </nav>
);

const BreadCrumb = ({ name, href, isCurrent, noChevron }: BreadCrumbProps) => (
  <li>
    <div className="flex items-center">
      {noChevron ? null : (
        <Icons.chevronRight
          className="h-5 w-5 flex-shrink-0 text-gray-400"
          aria-hidden="true"
        />
      )}
      <a
        href={href}
        className={cn(
          'text-sm font-medium',
          isCurrent ? 'text-gray-700' : 'text-gray-500 hover:text-gray-700',
          noChevron ? '' : 'ml-2'
        )}
      >
        {name}
      </a>
    </div>
  </li>
);
