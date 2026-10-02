import ServiceCard from './ServiceCard';
import { getBookSessionPath } from '../../data/routes';
import type { PhotographyService } from '../../types/services';

interface ServicesGridProps {
  services: PhotographyService[];
}

function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-12 lg:items-start">
      {services.map((service) => (
        <ServiceCard bookingPath={getBookSessionPath(service.slug)} key={service.id} service={service} />
      ))}
    </div>
  );
}

export default ServicesGrid;
