import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useScreenType } from '../../utils/screenUtils';
import { useDashboardMetrics } from '../../hooks/useDashboardMetrics';
import { useAppointments } from '../../hooks/useAppointments';
import WelcomeSection from './WelcomeSection';
import MetricsSection from './MetricsSection';
import AppointmentsTable from './AppointmentsTable';
import CalendarSection from './CalendarSection';
import UpcomingAppointments from './UpcomingAppointments';
import StatisticsChart from '../StatisticsChart';
import '../../styles/DashboardPage.css';

const DashboardPage = ({ onNavigate }) => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const { isDesktop } = useScreenType();
  const { dashboardMetrics } = useDashboardMetrics(user?.id);
  const { appointments, handleAppointmentStatusChange } = useAppointments(user?.id);

  return (
    <>
      {/* Sección de bienvenida */}
      <WelcomeSection 
        userName={user?.name || 'Usuario'} 
        fecha={dashboardMetrics.fechaActual}
        citasHoy={dashboardMetrics.citasHoy}
        mensajes={dashboardMetrics.mensajes}
        darkMode={darkMode}
      />
      
      {/* Layout de escritorio con grid para dashboard */}
      {isDesktop ? (
        <div className="desktop-dashboard-grid">
          {/* Estadísticas (parte superior) */}
          <section className="stats-section">
            <StatisticsChart />
          </section>
          
          {/* Fila de métricas */}
          <MetricsSection metrics={dashboardMetrics} />
          
          {/* Contenedor para citas recientes y calendario */}
          <div className="bottom-sections">
            {/* Tabla de citas recientes */}
            <AppointmentsTable 
              appointments={appointments} 
              onStatusChange={handleAppointmentStatusChange}
              onViewAll={() => onNavigate("citas")}
            />
            
            {/* Sección de calendario y próximas citas */}
            <section className="calendar-section">
              <CalendarSection />
              <UpcomingAppointments 
                appointments={appointments} 
                onNavigate={onNavigate}
              />
            </section>
          </div>
        </div>
      ) : (
        /* Versión móvil de estadísticas y citas */
        <div className="mobile-dashboard">
          <section className="stats-section">
            <StatisticsChart />
          </section>
          
          <CalendarSection isMobile={true} />
          
          <UpcomingAppointments 
            appointments={appointments}
            onNavigate={onNavigate}
            isMobile={true}
          />
        </div>
      )}
    </>
  );
};

export default DashboardPage;
