import { useState, useEffect } from 'react';
import { Gift, Copy, Users, TrendingUp, Award, ShoppingCart, Zap, Star, DollarSign, CheckCircle, Share2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export default function ReferralRewards() {
  const [stats, setStats] = useState(null);
  const [pointsHistory, setPointsHistory] = useState([]);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [redeemPoints, setRedeemPoints] = useState('');
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchReferralStats();
    fetchPointsHistory();
  }, []);

  const fetchReferralStats = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data: userData } = await supabase
        .from('users')
        .select('points, referral_code')
        .eq('id', user.id)
        .single();

      const { data: referrals } = await supabase
        .from('referrals')
        .select('status')
        .eq('referrer_id', user.id);

      const { data: pointsData } = await supabase
        .from('points_history')
        .select('points')
        .eq('user_id', user.id)
        .gte('points', 0);

      const totalReferrals = referrals?.length || 0;
      const completedReferrals = referrals?.filter(r => r.status === 'COMPLETED').length || 0;
      const pendingReferrals = referrals?.filter(r => r.status === 'PENDING').length || 0;
      const totalEarned = pointsData?.reduce((sum, p) => sum + p.points, 0) || 0;

      setStats({
        totalPoints: userData?.points || 0,
        totalReferrals,
        completedReferrals,
        pendingReferrals,
        totalEarned,
        referralCode: userData?.referral_code || 'N/A'
      });
    } catch (error) {
      console.error('Error fetching referral stats:', error);
    }
  };

  const fetchPointsHistory = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data } = await supabase
        .from('points_history')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      setPointsHistory(data || []);
    } catch (error) {
      console.error('Error fetching points history:', error);
    }
  };

  const copyReferralCode = () => {
    if (stats?.referralCode) {
      navigator.clipboard.writeText(stats.referralCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const shareReferral = () => {
    const shareText = `🎓 Hey! I'm on PathFinder AI - India's leading AI-powered career guidance platform!

✨ Join me and get 10 points on signup!

Use my referral code: ${stats.referralCode}

🚀 Features:
• AI Career Guidance
• Expert Mentorship
• 500+ Courses
• Study Groups
• Hackathons

💰 Earn 100 points when you refer friends!

🔗 Sign up now: ${window.location.origin}

#PathFinderAI #CareerGuidance #AIEducation`;
    
    navigator.clipboard.writeText(shareText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRedeem = async () => {
    try {
      const pointsToRedeem = parseInt(redeemPoints);
      if (pointsToRedeem > stats.totalPoints) {
        alert('Insufficient points');
        return;
      }

      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      await supabase.from('points_history').insert({
        user_id: user.id,
        points: -pointsToRedeem,
        type: 'PURCHASE',
        description: `Redeemed ${pointsToRedeem} points`
      });

      await supabase
        .from('users')
        .update({ points: stats.totalPoints - pointsToRedeem })
        .eq('id', user.id);

      setShowRedeemModal(false);
      setRedeemPoints('');
      fetchReferralStats();
      fetchPointsHistory();
      alert('Points redeemed successfully!');
    } catch (error) {
      alert('Error redeeming points');
      console.error(error);
    }
  };

  if (!stats) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Points Overview */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-600">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Available Points</p>
              <h2 className="text-4xl font-bold text-gray-900">{stats.totalPoints}</h2>
            </div>
            <div className="bg-blue-100 p-4 rounded-lg">
              <Award className="text-blue-600" size={32} />
            </div>
          </div>
          <p className="text-sm text-gray-600">Equivalent to ₹{stats.totalPoints} discount</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-600">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-gray-600 font-medium">Total Earned</p>
              <h2 className="text-4xl font-bold text-gray-900">₹{stats.totalEarned}</h2>
            </div>
            <div className="bg-green-100 p-4 rounded-lg">
              <DollarSign className="text-green-600" size={32} />
            </div>
          </div>
          <p className="text-sm text-gray-600">Lifetime earnings</p>
        </div>
      </div>

      {/* Referral Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Gift className="text-blue-600" size={28} />
          <div>
            <h3 className="text-xl font-bold text-gray-900">Referral Program</h3>
            <p className="text-sm text-gray-600">Earn 100 points per successful referral</p>
          </div>
        </div>

        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Your Referral Code</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={stats.referralCode}
              readOnly
              className="flex-1 px-4 py-3 bg-white border border-gray-300 rounded-lg font-mono text-lg font-bold text-center"
            />
            <button
              onClick={copyReferralCode}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
            >
              {copied ? <CheckCircle size={20} /> : <Copy size={20} />}
              {copied ? 'Copied' : 'Copy'}
            </button>
            <button
              onClick={shareReferral}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
            >
              <Share2 size={20} />
              Share
            </button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gray-50 rounded-lg">
            <p className="text-2xl font-bold text-gray-900">{stats.totalReferrals}</p>
            <p className="text-sm text-gray-600">Total Referrals</p>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <p className="text-2xl font-bold text-green-600">{stats.completedReferrals}</p>
            <p className="text-sm text-gray-600">Completed</p>
          </div>
          <div className="text-center p-4 bg-yellow-50 rounded-lg">
            <p className="text-2xl font-bold text-yellow-600">{stats.pendingReferrals}</p>
            <p className="text-sm text-gray-600">Pending</p>
          </div>
        </div>
      </div>

      {/* Redeem Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <ShoppingCart className="text-green-600" size={28} />
            <div>
              <h3 className="text-xl font-bold text-gray-900">Redeem Points</h3>
              <p className="text-sm text-gray-600">Use points for discounts (1 point = ₹1)</p>
            </div>
          </div>
          <button
            onClick={() => setShowRedeemModal(true)}
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
          >
            <Zap size={20} />
            Redeem Now
          </button>
        </div>

        <div className="bg-gray-50 rounded-lg p-4">
          <div className="grid md:grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-sm text-gray-600 mb-1">100 Points</p>
              <p className="text-lg font-bold text-gray-900">₹100 OFF</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">500 Points</p>
              <p className="text-lg font-bold text-gray-900">₹500 OFF</p>
            </div>
            <div>
              <p className="text-sm text-gray-600 mb-1">1000 Points</p>
              <p className="text-lg font-bold text-green-600">₹1000 OFF</p>
            </div>
          </div>
        </div>
      </div>

      {/* How to Earn */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Ways to Earn Points</h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
            <div className="flex items-center justify-between mb-2">
              <Users className="text-blue-600" size={24} />
              <span className="text-2xl font-bold text-blue-600">10</span>
            </div>
            <p className="font-semibold text-gray-900">Sign Up Bonus</p>
            <p className="text-sm text-gray-600">Join with referral code</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:border-blue-500 transition">
            <div className="flex items-center justify-between mb-2">
              <Users className="text-blue-600" size={24} />
              <span className="text-2xl font-bold text-blue-600">100</span>
            </div>
            <p className="font-semibold text-gray-900">Refer a Friend</p>
            <p className="text-sm text-gray-600">When they complete signup</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition">
            <div className="flex items-center justify-between mb-2">
              <Award className="text-green-600" size={24} />
              <span className="text-2xl font-bold text-green-600">20</span>
            </div>
            <p className="font-semibold text-gray-900">Complete Course</p>
            <p className="text-sm text-gray-600">Finish any course 100%</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:border-purple-500 transition">
            <div className="flex items-center justify-between mb-2">
              <Users className="text-purple-600" size={24} />
              <span className="text-2xl font-bold text-purple-600">10</span>
            </div>
            <p className="font-semibold text-gray-900">Create Study Group</p>
            <p className="text-sm text-gray-600">Start a new group</p>
          </div>

          <div className="border border-gray-200 rounded-lg p-4 hover:border-orange-500 transition">
            <div className="flex items-center justify-between mb-2">
              <Star className="text-orange-600" size={24} />
              <span className="text-2xl font-bold text-orange-600">5</span>
            </div>
            <p className="font-semibold text-gray-900">Forum Post</p>
            <p className="text-sm text-gray-600">Share knowledge</p>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4">Transaction History</h3>
        <div className="space-y-3 max-h-96 overflow-y-auto">
          {pointsHistory.slice(0, 10).map((item) => (
            <div key={item.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${item.points > 0 ? 'bg-green-100' : 'bg-red-100'}`}>
                  {item.points > 0 ? (
                    <TrendingUp className="text-green-600" size={20} />
                  ) : (
                    <ShoppingCart className="text-red-600" size={20} />
                  )}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">{item.description}</p>
                  <p className="text-sm text-gray-500">
                    {new Date(item.created_at).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'short', 
                      year: 'numeric'
                    })}
                  </p>
                </div>
              </div>
              <span className={`text-xl font-bold ${item.points > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {item.points > 0 ? '+' : ''}{item.points}
              </span>
            </div>
          ))}
          {pointsHistory.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <Award size={48} className="mx-auto mb-2 opacity-50" />
              <p>No transactions yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Redeem Modal */}
      {showRedeemModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Redeem Points</h2>
            <p className="text-gray-600 mb-4">
              Available: <span className="font-bold text-blue-600">{stats.totalPoints} points</span>
            </p>
            <input
              type="number"
              placeholder="Enter points to redeem"
              value={redeemPoints}
              onChange={(e) => setRedeemPoints(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg mb-4"
              max={stats.totalPoints}
              min="1"
            />
            <p className="text-sm text-gray-500 mb-4">
              You will get ₹{redeemPoints || 0} discount
            </p>
            <div className="flex gap-3">
              <button
                onClick={handleRedeem}
                disabled={!redeemPoints || parseInt(redeemPoints) > stats.totalPoints}
                className="flex-1 bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                Redeem
              </button>
              <button
                onClick={() => setShowRedeemModal(false)}
                className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
